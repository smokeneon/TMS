import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { FilesController } from './files.controller';
import { Files } from './files.entity';
import { FilesService } from './files.service';
import { CourseModule } from '../course/course.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Files]),
    CourseModule,
    UsersModule
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
