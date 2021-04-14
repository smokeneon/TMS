import * as path from 'path'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Connection } from 'typeorm';
import { StatusMonitorModule} from 'nest-status-monitor'
import statusMonitorConfig  from './config/statusMonitor'
import { CourseModule } from './course/course.module';
import { EmailModule } from './email/email.module'
import { ApplyModule } from './apply/apply.module'
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://leonbeau@qq.com:mkfapmnixnabbbhi@smtp.qq.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: path.join(__dirname, './templates/email'),
          adapter:new PugAdapter(),
          options: {
            strict: true,
          }
        }
      })
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '8.136.5.2',
      port: 3306,
      username: 'root',
      password: '123qwe',
      database: 'tms',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmailModule,
    UsersModule,
    CourseModule,
    ApplyModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
