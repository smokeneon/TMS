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
    async sendMail() {
        try {
            await this.mailerService.sendMail({
                to: 'leon@hooc.top',
                from: 'leonbeau@qq.com',
                subject: 'leon love u',
                template: 'welcome',
            });
            return 'ok';
        }
        catch (error) {
            return 'error';
        }
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map