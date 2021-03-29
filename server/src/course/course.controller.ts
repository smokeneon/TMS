import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
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


  @Delete(':id')
  @ApiOperation({ summary: '删除一门课程' })
  async remove(@Param('id') id: string) {
    return await this.courseService.remove(id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: '编辑一门课程' })
  async update(@Param('id') id: number, @Body() body: Course) {
    return await this.courseService.edit(id, body)
  }

  @Get()
  @ApiOperation({ summary: '查询所有课程列表' })
  async findAll(@Query() pagination: string) {
    return this.courseService.findAll(pagination) 
  }
}
