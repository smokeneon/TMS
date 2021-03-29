import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { StatusMonitorModule} from 'nest-status-monitor'
import statusMonitorConfig  from './config/statusMonitor'
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
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
    UsersModule,
    AuthModule,
    LoginModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
