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
import { ApplyService } from './apply.service';
import { Apply } from './apply.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Controller('/api/v1/apply')
@ApiTags('申报增删改查')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('/add')
  @ApiOperation({ summary: '添加一个申报' })
  @Transaction()
  async create(@Body() apply: any, @TransactionManager() manager: EntityManager) {
    return await this.applyService.create(apply, manager);
  }


  @Delete(':id')
  @ApiOperation({ summary: '删除一个申报' })
  async remove(@Param('id') id: string) {
    return await this.applyService.remove(id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: '编辑一个申报' })
  async update(@Param('id') id: number, @Body() body: Apply) {
    return await this.applyService.edit(id, body)
  }

  @Post('/score')
  @ApiOperation({ summary: '设置已完结课程分数' })
  @Transaction()
  async changeScoreRequest(@Body() body:any, @TransactionManager() manager: EntityManager) {
    return await this.applyService.changeScore(body, manager)
  }

  @Get()
  @ApiOperation({ summary: '查询所有申报列表' })
  async findAll(@Query() pagination: string) {
    return this.applyService.findAll(pagination) 
  }

  @Get('/doing')
  @ApiOperation({ summary: '查询所有申报列表 进行中' })
  async findAllDoing(@Query() pagination: string) {
    return this.applyService.findAllDoing(pagination) 
  }

  @Get('/finised')
  @ApiOperation({ summary: '查询所有申报列表 已完成' })
  async findAllFinished(@Query() pagination: string) {
    return this.applyService.findAllFinished(pagination) 
  }

  @Get('/notFinished')
  @ApiOperation({ summary: '查询所有申报列表 未完成' })
  async findAllNotFinished(@Query() pagination: string) {
    return this.applyService.findAllNotFinished(pagination) 
  }

  @Get(':id')
  @ApiOperation({ summary: '根据申报id查询申报详情' })
  async detail(@Param('id') id: string) {
    return await this.applyService.findOne(id);
  }
}
