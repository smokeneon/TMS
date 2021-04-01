import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Course } from './course.entity'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(course: Course): Promise<object> {
    if (course.courseName === undefined || course.courseByTeaId === undefined) {
      return {
        code: 1,
        message: '缺少课程名或者所属教师id字段'
      }
    } 

    try {
      await this.courseRepository.insert(course);
      return {
        code: 0,
        message: '创建成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '创建失败'
      }
    }
   
   
  }

  async remove(id: string): Promise<object> {
    try {
      const res = await this.courseRepository.delete(id);
      if (res.affected === 1) {
        return {
          code: 0,
          message: '删除成功'
        }
      }
    } catch (error) {
      return {
        code: 1,
        message: '删除失败'
      }
    }
  }

  async edit(id: number, course: Course): Promise<object> {
    try {
      await this.courseRepository.update(id, course)
      return {
        code: 0,
        message: '更新成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '更新失败'
      }
    }
  }

    // 分页查询接口
  async findAll(pagination): Promise<Object> {
    let course;
    try {
      if (pagination.search) {
        course = await getRepository(Course)
          .createQueryBuilder('course')
          .where("course.courseName like :courseName", { courseName: '%' + pagination.search + '%' })
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      } else {
        course = await getRepository(Course)
          .createQueryBuilder('course')
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      }

      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
        page: pagination.page,
        size: pagination.size,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败'
      }
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const res = await this.courseRepository.findOne(id);
      return {
        code: 0,
        message: '查询成功',
        data: res,
      }
    } catch (error) {
      return {
        code: 0,
        message: '查询失败',
      }
    }
  }
}


