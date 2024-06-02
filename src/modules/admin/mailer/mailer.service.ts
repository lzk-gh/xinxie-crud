import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'process';
import { MailerDto } from './mailer.dto';
import { from, Observable, of, Subject, lastValueFrom, share } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as EventEmitter from 'events';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  // 创建一个 Subject 用于发送邮件结果事件
  private emailSent$ = new Subject<{
    email: string;
    success: boolean;
    error?: any;
  }>();

  private emailEventEmitter = new EventEmitter();

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 获取邮件发送事件流
  getEmailSentStream(): Observable<any> {
    return new Observable<any>((observer) => {
      // 监听 emailSent 事件
      this.emailEventEmitter.on('emailSent', (data: any) => {
        observer.next({ data }); // 发送数据到 SSE
      });
    }).pipe(share()); // 使用 share 操作符，允许多个订阅者共享同一个 Observable
  }

  // 发送面试结果邮件
  async sendInterviewResults(mailerDto: MailerDto[]): Promise<void> {
    // 使用 for...of 循环发送邮件
    for (const data of mailerDto) {
      try {
        const result = await lastValueFrom(this.sendEmail(data));
        console.log(result, 'result');
        // 发送邮件结果事件
        this.emailEventEmitter.emit('emailSent', result);
      } catch (error) {
        this.emailEventEmitter.emit('emailSent', {
          email: data.email,
          success: false,
          error,
        });
      }
    }
  }



  // 获取邮件发送事件流
  // getEmailSentStream(): Observable<{
  //   email: string;
  //   success: boolean;
  //   error?: any;
  // }> {
  //   return this.emailSent$.asObservable();
  // }

  // 发送面试结果邮件
  // async sendInterviewResults(mailerDto: MailerDto[]): Promise<void> {
  //   // 创建一个数组来存储所有邮件发送 Promise
  //   const sendPromises = mailerDto.map(async (data) => {
  //     try {
  //       const result = await lastValueFrom(this.sendEmail(data));
  //       console.log(result, 'result');
  //       this.emailSent$.next(result);
  //     } catch (error) {
  //       this.emailSent$.next({ email: data.email, success: false, error });
  //     }
  //   });
  //
  //   // 使用 Promise.all 等待所有发送 Promise 完成
  //   await Promise.all(sendPromises);
  //
  //   // 所有邮件发送完成后，手动完成 Observable
  //   this.emailSent$.complete();
  // }

  // 发送单个邮件
  private sendEmail(
    data: MailerDto,
  ): Observable<{ email: string; success: boolean; error?: any }> {
    const { email, username, isPassed } = data;
    const mailOptions: nodemailer.SendMailOptions = {
      from: `1342210664@qq.com`,
      to: email,
      subject: '面试结果通知',
      html: this.generateEmailContent(username, isPassed),
    };

    // 使用 from 将 Promise 转换为 Observable
    return from(this.transporter.sendMail(mailOptions)).pipe(
      // 发送成功
      map(() => ({ email, success: true })),
      // 发送失败
      catchError((error) => {
        console.error(`发送面试结果邮件给 ${username} (${email}) 失败:`, error);
        return of({ email, success: false, error });
      }),
    );
  }

  // 生成邮件内容
  private generateEmailContent(username: string, isPassed: boolean): string {
    const resultMessage = isPassed
      ? '🎉🎉🎉 恭喜你，你已通过面试！ 🎉🎉🎉'
      : '😥😥😥 很遗憾地通知你，你本次面试未通过。 😥😥😥';

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 5px; background-color: #f5f5f5;">
        <h3 style="color: #333;">亲爱的 <span style="color: #007bff;">${username}</span>：</h3>
        <p style="font-size: 16px; line-height: 1.5;">${resultMessage}</p>
        <p style="font-size: 16px; line-height: 1.5;">感谢你对我们社团的关注！💖</p>
        <br>
        <p style="font-size: 16px; line-height: 1.5;">此致，</p>
        <p style="font-size: 16px; line-height: 1.5;">信息科技协会(ITA)</p>
        <p style="font-size: 16px; line-height: 1.5;">Information technology association</p>
      </div>
    `;
  }
}
