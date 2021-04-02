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

    // 分页查询接口 联查课程
  async findAll(pagination): Promise<Object> {
    let apply;
    try {
      if (pagination.search) {
        apply = await getRepository(Apply)
          .createQueryBuilder('apply')
          .leftJoinAndSelect("apply.course", "course")
          .where("apply.applyNumber like :applyNumber", { applyNumber: '%' + pagination.search + '%' })
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      } else {
        apply = await getRepository(Apply)
        .createQueryBuilder("apply")
        .leftJoinAndSelect("apply.course", "course")
        .skip((pagination.page-1)*pagination.size || 0)
        .take(pagination.size || 10)
        .getManyAndCount()
      }

      return {
        code: 0,
        message: '查询成功',
        data: apply[0],
        total: apply[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
      }
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const res = await getRepository(Apply)
      .createQueryBuilder("apply")
      .where("apply.applyNumber = :applyNumber", { applyNumber: id })
      .leftJoinAndSelect("apply.course", "course")
      .getOne()
      return {
        code: 0,
        message: '查询成功',
        data: res || {},
      }
    } catch (error) {
      return {
        code: 0,
        message: '查询失败',
      }
    }
  }
}


