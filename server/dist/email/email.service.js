"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nest-modules/mailer");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMail(email) {
        let out;
        do
            out = Math.floor(Math.random() * 10000);
        while (out < 1000);
        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'leonbeau@qq.com',
                subject: '欢迎注册中小学教育信息化培训者培训管理系统',
                html: `欢迎使用TMS，您的注册验证码是${out}`
            });
            return {
                code: 0,
                message: `${email}邮件发送成功`,
                VerificationCode: out,
            };
        }
        catch (error) {
            return {
                code: 1,
                message: `${email}邮件发送失败`
            };
        }
    }
    async sendMailToUser(email, message) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'leonbeau@qq.com',
                subject: '中小学教育信息化培训者培训管理系统',
                html: message
            });
            return {
                code: 0,
                message: `${email}邮件发送成功`,
            };
        }
        catch (error) {
            return {
                code: 1,
                message: `${email}邮件发送失败`
            };
        }
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map