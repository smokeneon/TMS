import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { EmailService } from "./email.service";

@Controller('/api/v1/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get(':email')
  @ApiOperation({ summary: '发送邮件' })
  async sendEmail(@Param('email') email: string): Promise<any> {
    return await this.emailService.sendMail(email);
  }
}