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
exports.AppModule = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const typeorm_2 = require("typeorm");
const nest_status_monitor_1 = require("nest-status-monitor");
const statusMonitor_1 = require("./config/statusMonitor");
const course_module_1 = require("./course/course.module");
const email_module_1 = require("./email/email.module");
const apply_module_1 = require("./apply/apply.module");
const auth_module_1 = require("./auth/auth.module");
const users_controller_1 = require("./users/users.controller");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: 'smtps://leonbeau@qq.com:mkfapmnixnabbbhi@smtp.qq.com',
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>',
                    },
                    template: {
                        dir: path.join(__dirname, './templates/email'),
                        adapter: new pug_adapter_1.PugAdapter(),
                        options: {
                            strict: true,
                        }
                    }
                })
            }),
            nest_status_monitor_1.StatusMonitorModule.setUp(statusMonitor_1.default),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '8.136.5.2',
                port: 3306,
                username: 'root',
                password: '123qwe',
                database: 'tms',
                autoLoadEntities: true,
                synchronize: true,
                timezone: '+8:00'
            }),
            email_module_1.EmailModule,
            users_module_1.UsersModule,
            course_module_1.CourseModule,
            apply_module_1.ApplyModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map