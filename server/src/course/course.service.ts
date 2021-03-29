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

    const newCourse = await this.courseRepository.insert(course);
    return {
      newCourse,
      message: '创建成功',
      code: 0,
    }

  }
}
