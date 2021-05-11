import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import multer = require('multer');
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';


@Controller('/api/v1/files')
@ApiTags('文件上传下载')
export class FilesController {
  constructor(private readonly albumService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Transaction()
  async upload(@Body() body: any, @UploadedFile() file, @TransactionManager() manager: EntityManager) {
    return await this.albumService.upload(body, file, manager);
  }

  @Get('export')
  async downloadAll(@Res() res: Response) {
    const { filename, tarStream } = await this.albumService.downloadAll();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`,
    );
    tarStream.pipe(res);
  }
}
