import { Injectable } from "@nestjs/common";
import { MailerService } from '@nest-modules/mailer'
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    try {
      await this.mailerService.sendMail({
        to: 'leon@hooc.top',
        from: 'leonbeau@qq.com',
        subject: 'leon love u',
        template: 'welcome',
        // html: 'leon love u'
      })
      return 'ok'
    } catch (error) {
      return 'error'
    }
  
  }
}