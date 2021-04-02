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

class PageBody  {
  page: number;
  size: number;
}
@Controller('/api/v1/apply')
@ApiTags('申报增删改查')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('/add')
  @ApiOperation({ summary: '添加一个申报' })
  async create(@Body() course: Apply) {
    return await this.applyService.create(course);
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

  @Get()
  @ApiOperation({ summary: '查询所有申报列表' })
  async findAll(@Query() pagination: string) {
    return this.applyService.findAll(pagination) 
  }

  @Get(':id')
  @ApiOperation({ summary: '根据申报id查询申报详情' })
  async detail(@Param('id') id: string) {
    return await this.applyService.findOne(id);
  }
}
