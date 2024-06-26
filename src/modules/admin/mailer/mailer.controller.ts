import { Controller, Post, Body, Sse } from '@nestjs/common';
import { EmailSentData, MailerService } from './mailer.service';
import { MailerDto } from './mailer.dto';
import { Observable } from 'rxjs';
import { Public } from '../../../utils/jwt/public.decorator';
import { map } from 'rxjs/operators';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('inform')
  triggerEmails(@Body() mailerDto: MailerDto[]) {
    this.mailerService.sendInterviewResults(mailerDto).then(() => {});
  }

  @Public()
  @Sse('email-events')
  getEmailEvents(): Observable<{ data: EmailSentData }> {
    return this.mailerService
      .getEmailSentStream()
      .pipe(map((data) => ({ data })));
  }
}
