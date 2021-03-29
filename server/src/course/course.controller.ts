import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './course.entity';
class PageBody  {
  page: number;
  size: number;
}
@Controller('course')
@ApiTags('course增删改查')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/add')
  @ApiOperation({ summary: '增加一门课程' })
  async create(@Body() course: Course) {
    return await this.courseService.create(course);
  }

}
