import { Injectable } from "@nestjs/common";
import { MailerService } from '@nest-modules/mailer'
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string) {
    // 生成随机四位数
    let out: number

    do
    out = Math.floor(Math.random()*10000);
    while( out < 1000 )
    
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'leonbeau@qq.com',
        subject: '欢迎使用中小学教育信息化培训者培训管理系统',
        // template: 'welcome',
        html: `欢迎使用TMS，您的验证码是${out}`
      })
      return {
        code: 0,
        message: `${email}邮件发送成功`,
        VerificationCode: out,
      }
    } catch (error) {
      return {
        code: 1,
        message: `${email}邮件发送失败`
      }
    }
  
  }

  async sendMailToUser(email: string, message: string) {
    
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'leonbeau@qq.com',
        subject: '中小学教育信息化培训者培训管理系统',
        // template: 'welcome',
        html: message
      })
      return {
        code: 0,
        message: `${email}邮件发送成功`,
      }
    } catch (error) {
      return {
        code: 1,
        message: `${email}邮件发送失败`
      }
    }
  
  }
}