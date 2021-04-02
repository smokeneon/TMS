import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { getRepository, Repository } from 'typeorm';
import { Apply } from './apply.entity'

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply)
    private applyRepository: Repository<Apply>,
  ) {}
  // TODO 没写完
  // async getApplyAndCourse(): Promise<any> {
  //   try {
  //     let applys = await this.applyRepository
  //       .createQueryBuilder('apply')
  //       .leftJoinAndSelect("apply.applyId", "album")
  //   } catch (error) {
      
  //   }
  // }
  async create(apply: Apply): Promise<object> {
    try {
      await this.applyRepository.insert(apply);
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
      const res = await this.applyRepository.delete(id);
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

  async edit(id: number, apply: Apply): Promise<object> {
    try {
      await this.applyRepository.update(id, apply)
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
    let apply;
    try {
      if (pagination.search) {
        course = await getRepository(Apply)
          .createQueryBuilder('course')
          .where("apply.applyNumber like :applyNumber", { applyNumber: '%' + pagination.search + '%' })
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      } else {
        apply = await getRepository(Apply)
        .createQueryBuilder("apply")
        .leftJoinAndSelect("apply.course", "course")
        .getMany()
        console.log(apply);
        
        // course = await getRepository(Course)
        //   .createQueryBuilder('course')
        //   .leftJoinAndSelect("course.applys", "applys")
        //   // .skip((pagination.page-1)*pagination.size || 0)
        //   // .take(pagination.size || 10)
        //   // .printSql()
        //   .getManyAndCount()
        // console.log('course', course);
        
      }

      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {

      console.log('error', error);
      
      return {
        code: 1,
        message: '查询失败',
      }
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const res = await this.applyRepository.findOne(id);
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


