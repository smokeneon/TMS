import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service'
import { Files } from './files.entity';
import request = require('request')
import fs = require('fs')
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
    private readonly configService: ConfigService,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService
  ) {}

  async upload(body, file, manager) {
    // 获取当前路径 存入 文件格式 /uploads/2021/5/11/xxx.png
    // console.log('resolve', resolve('./dist'));
    // console.log(file);
    // console.log(file.path.split('dist')["1"]);

    // 查询用户 查询课程 添加文件
    // 1.查询用户
    let user;
    let course;
    try {
      user = await this.usersService.findOne(body.userId)
    } catch (error) {
      return {
        code: 1,
        message: '添加文件时，用户查询失败',
        error
      }
    }
    
    try {
      course = await this.courseService.findOne(body.courseId)
    } catch (error) {
      return {
        code: 1,
        message: '添加文件时，查询课程失败'
      }
    }

    let newFile = {
      path:  file.path.split('dist')["1"],
      userId: body.userId,
      courseId: body.courseId,
      users: user.data,
      courses: course.data,
    }
    
    try {
      let data = await manager.save(Files, newFile);
      return {
        code: 0,
        message: '添加文件成功',
        data
      }
    } catch (error) {
      return {
        code: 1,
        message: '添加申报失败',
        error
    }
    
  }

}

  async getList(courseId, manager) {
    let files;
    try {
      files = await this.filesRepository.findAndCount({
        where: {
          courseId: courseId,
        },
        relations: ["courses","users"],
      })
      return {
        code: 0,
        message: '文件列表查询成功',
        data: files["0"],
        total: files["1"],
      }
    } catch (error) {
      return {
        code: 1,
        message: '文件列表查询失败'
      }
    }
  }

  async downloadAll(courseId) {
    // /Users/xinong/Documents/TMS-0322/server/dist/uploads
    const uploadDir = this.configService.get('file').root + '/' +courseId;  
    
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'tms.tar', tarStream };
  }
   
  async deleteFile(fileId) {
    let fileInfo;
    try {
      fileInfo = await this.filesRepository.findOne({ fileId: fileId})
      if (typeof(fileInfo) === "undefined") {
        return {
          code: 1,
          message: '文件不存在'
        }
      }
      // 删除文件
      let filePath = resolve() + '/dist'+ fileInfo.path
      fs.unlink(filePath, (err) => { 
        if (err) { 
          console.log('文件unlink失败');
        } else { 
         console.log('文件unlink成功');
        } 
      }); 
      
    } catch (error) {
      return {
        code: 1,
        message: '文件查询失败',
        error
      }
    }
    
    try {
      await this.filesRepository.delete({ fileId: fileId})
      return {
        code: 0,
        message: '文件删除成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '文件删除失败'
      }
    }
  }
}
