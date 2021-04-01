import { MailerService } from '@nest-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(): Promise<"error" | "ok">;
}
