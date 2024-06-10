import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'process';
import { MailerDto } from './mailer.dto';
import { from, Observable, of, Subject, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface EmailSentDataBase {
  id: number;
  email: string;
  status: string;
}

interface EmailSentDataDone {
  type: '[DONE]';
}

export type EmailSentData = EmailSentDataBase | EmailSentDataDone;

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private emailSent$ = new Subject<EmailSentData>();

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
  getEmailSentStream(): Observable<EmailSentData> {
    return this.emailSent$.asObservable();
  }

  // 发送面试结果邮件
  async sendInterviewResults(mailerDto: MailerDto[]): Promise<void> {
    const sendPromises = mailerDto.map(async (data: MailerDto) => {
      try {
        const result = await lastValueFrom(this.sendEmail(data));
        this.emailSent$.next(result);
      } catch (error) {
        this.emailSent$.next({
          id: data.id,
          email: data.email,
          status: 'error',
        });
      }
    });

    await Promise.all(sendPromises).then(() => {
      this.emailSent$.next({ type: '[DONE]' });
    });
  }

  // 发送单个邮件
  private sendEmail(data: MailerDto): Observable<EmailSentData> {
    const { email, username, isPassed } = data;
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '面试结果通知',
      html: this.generateEmailContent(username, isPassed),
    };

    return from(this.transporter.sendMail(mailOptions)).pipe(
      // 发送成功
      map(() => ({ id: data.id, email, status: 'success' })),
      // 发送失败
      catchError(() => {
        return of({ id: data.id, email, status: 'error' });
      }),
    );
  }

  // 邮件内容
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
