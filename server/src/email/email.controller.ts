import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { EmailService } from "./email.service";

@Controller('/api/v1/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  @ApiOperation({ summary: '发送邮件' })
  async sendEmail(): Promise<string> {
    return await this.emailService.sendMail();
  }
}