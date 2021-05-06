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

  // 课程列表页面用的这个接口
  @Get('/list')
  @ApiOperation({ summary: '左连接申报表查询' })
  async getList(@Query() pagination: string) {
    return await this.courseService.getList(pagination);
  }

  @Get('/list/approved')
  @ApiOperation({ summary: '左连接申报表查询 审批过的' })
  async getApprovedList(@Query() pagination: string) {
    return await this.courseService.getApprovedList(pagination);
  }

  @Get('/list/notApproved')
  @ApiOperation({ summary: '左连接申报表查询 未审批的' })
  async getNotApprovedList(@Query() pagination: string) {
    return await this.courseService.getNotApprovedList(pagination);
  }

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
  @Transaction()
  @ApiOperation({ summary: '编辑一门课程' })
  async update(@Param('id') id: number, @Body() body: Course, @TransactionManager() manager: EntityManager) {
    return await this.courseService.edit(id, body, manager)
  }

  @Post('/approval')
  @Transaction()
  @ApiOperation({ summary: '改变课程申报状态' })
  async changeApproval(@Body() body, @TransactionManager() manager: EntityManager) {
    return await this.courseService.changeApprovalState(body, manager)
  }


  @Post('/open')
  @Transaction()
  @ApiOperation({ summary: '改变课程开放状态' })
  async changeOpening(@Body() body, @TransactionManager() manager: EntityManager) {
    return await this.courseService.changeOpeningState(body, manager)
  }

  @Get('/list/no-page')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '查询所有课程列表， 不带分页'})
  async findAllWithNoPage() {
    return this.courseService.findAllWithNoPage()
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
