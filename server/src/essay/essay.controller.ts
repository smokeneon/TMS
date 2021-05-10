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
  constructor(private readonly applyService: EssayService) {}

  @Post('/add')
  @ApiOperation({ summary: '添加一个申报' })
  @Transaction()
  async create(@Body() essay: any, @TransactionManager() manager: EntityManager) {
    console.log('essady', essay);
    return await this.applyService.create(essay, manager);
  }
}
