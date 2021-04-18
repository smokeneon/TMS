import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { AuthGuard } from '@nestjs/passport';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
class PageBody  {
  page: number;
  size: number;
}
@Controller('/api/v1/course')
@ApiTags('课程增删改查')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/list')
  @ApiOperation({ summary: '左连接申报表查询' })
  async getList(@Query() pagination: string) {
    return await this.courseService.getList(pagination);
  }

  // @Get('/getCourse')
  // @ApiOperation({ summary: '查询所有课程 连接user表'})
  // async getCouseList(@Query() pagination: )

  // @Post('/add')
  // // @Transaction()
  // @ApiOperation({ summary: '增加一门课程' })
  // // @UseGuards(AuthGuard('jwt'))
  // async create(@Body() course: Course) {
  //   return await this.courseService.create(course);
  // }

  @Post('/add')
  @Transaction()
  @ApiOperation({ summary: '增加一门课程' })
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() course: Course, @TransactionManager() manager: EntityManager) {
    return await this.courseService.create(course, manager);
  }


  @Delete(':courseId')
  @ApiOperation({ summary: '删除一门课程' })
  async remove(@Param('courseId') courseId: string) {
    return await this.courseService.remove(courseId);
  }
  
  @Put(':id')
  @ApiOperation({ summary: '编辑一门课程' })
  async update(@Param('id') id: number, @Body() body: Course) {
    return await this.courseService.edit(id, body)
  }

  @Get()
  @ApiOperation({ summary: '查询所有课程列表' })
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() pagination: string) {
    return this.courseService.findAll(pagination) 
  }

  @Get(':id')
  @ApiOperation({ summary: '根据课程id查询详情' })
  async detail(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  
}
