import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service'
import { Files } from './files.entity';

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

  async downloadAll() {
    const uploadDir = this.configService.get('file').root;
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'hello-world.tar', tarStream };
  }
}
