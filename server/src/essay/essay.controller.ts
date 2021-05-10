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
import { EssayService } from './essay.service';
import { Essay } from './essay.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Controller('/api/v1/essay')
@ApiTags('笔记增删改查')
export class EssayController {
  constructor(private readonly essayService: EssayService) {}

  @Post('/add')
  @ApiOperation({ summary: '添加一个笔记' })
  @Transaction()
  async create(@Body() essay: any, @TransactionManager() manager: EntityManager) {
    return await this.essayService.create(essay, manager);
  }

  // 按用户名查找笔记并返回
  @Get('/findByUser/:userId')
  @ApiOperation({ summary: '根据用户id查询笔记列表' })
  @Transaction()
  async findByUserId(@Param('userId') userId: string,  @TransactionManager() manager: EntityManager) {
    return await this.essayService.findByUserId(userId, manager);
  }

  // 根据笔记id获取详情
  @Get(':essayId')
  @ApiOperation({ summary: '根据笔记id查详情' })
  @Transaction()
  async findByEssayId(@Param('essayId') essayId: string,  @TransactionManager() manager: EntityManager) {
    return await this.essayService.detail(essayId, manager);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除一个笔记' })
  async remove(@Param('id') id: string) {
    return await this.essayService.remove(id);
  }
}
