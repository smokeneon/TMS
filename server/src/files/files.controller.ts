import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import multer = require('multer');
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('/api/v1/files')
@ApiTags('文件上传下载')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file'))
  @Transaction()
  async upload(@Body() body: any, @UploadedFile() file, @TransactionManager() manager: EntityManager) {
    return await this.filesService.upload(body, file, manager);
  }

  @Get('/list/:courseId')
  @ApiOperation({ summary: '下载文件列表' })
  @Transaction()
  async getFileList(@Param('courseId') courseId: string, @TransactionManager() manager: EntityManager) {
    return await this.filesService.getList(courseId, manager)
  }

  @Get('/export/:courseId')
  @ApiOperation({ summary: '下载所有文件' })
  async downloadAll(@Param('courseId') courseId: string,@Res() res: Response) {
    const { filename, tarStream } = await this.filesService.downloadAll(courseId);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`,
    );
    tarStream.pipe(res);
  }
}
