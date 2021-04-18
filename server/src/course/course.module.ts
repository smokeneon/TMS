import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { UsersModule } from '../users/users.module';
// import { CourseTea } from './course_tea.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
