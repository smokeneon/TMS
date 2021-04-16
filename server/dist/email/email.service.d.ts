import { MailerService } from '@nest-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(email: string): Promise<{
        code: number;
        message: string;
        VerificationCode: number;
    } | {
        code: number;
        message: string;
        VerificationCode?: undefined;
    }>;
}
