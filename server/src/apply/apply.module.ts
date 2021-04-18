import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { Apply } from './apply.entity';
import { CourseModule } from '../course/course.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Apply]), CourseModule, UsersModule],
  controllers: [ApplyController],
  providers: [ApplyService],
  exports: [ApplyService],
})
export class ApplyModule {}
