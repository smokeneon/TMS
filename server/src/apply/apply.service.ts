import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { getRepository, Repository, getTreeRepository, Like } from 'typeorm';
import { Apply } from './apply.entity'
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service'

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply)
    private applyRepository: Repository<Apply>,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService
  ) {}
  async create(apply, manager): Promise<any> {
    
    // TODO 应添加唯一课程与参训者用户名唯一校验
    try {
      let unique = await this.applyRepository.find({
        where: [{ courseId: apply.courseId, stuId: apply.stuIds['0'] },]
      })
      if (unique.length != 0) {
        return {
          code: 1,
          message: '该课程你已申报，请勿重复申报'
        }
      }
      
    } catch (error) {
      return {
        code: 1,
        message: '校验唯一性发生错误'
      }
    }
    let course
    try {
      course = await this.courseService.findOne(apply.courseId)
    } catch (error) {
      return {
        code: 1,
        message: '添加申报时，查询课程失败'
      }
    }
    
    let users = []
    for(let i=0;i<apply.stuIds.length;i++) {
      try {
        let user = await this.usersService.findOne(apply.stuIds[i])
        users.push(user["data"])
      } catch (error) {
        return {
          code: 1,
          message: '添加申报时，查询用户失败'
        }
      } 
    }
   
    let newApply = {
      applyNumber: apply.applyNumber,
      course: course["data"],
      stu: users,
      stuId: apply.stuIds['0'],
      courseId: apply.courseId,
    }
    try {
      await manager.save(Apply, newApply);
      return {
        code: 0,
        message: '添加申报成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '添加申报失败'
      }
    }
    
  }

  async changeScore(body, manager):Promise<any> {
    try {
      let apply = await manager.find(Apply, {applyId: body.applyId})
      let score = Number(body.score)
      
      
      try {
        let updateScore;
        // 判断课程是否 > 60
        if (score >= 60 && score <= 100) {
          updateScore = await manager.update(Apply, {applyId: body.applyId}, { score: score, approvalState: 1 })
        } 
        if (score >= 0 && score < 60) {
          updateScore = await manager.update(Apply, {applyId: body.applyId}, { score: score, approvalState: 2 })
        }
        
        if (!updateScore){
          throw new Error("更新 error")
        }
      } catch (error) {
        return {
          code: 2,
          message: '更新分数失败',
          error
        }
      }
    } catch (error) {
      return {
        code: 1,
        message: '更新分数失败',
        error
      }
    }
    return {
      code: 0,
      message: '更新分数成功'
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

  // 分页查询接口 联查课程 进行中
  async findAllDoing(pagination): Promise<Object> {
    let search = pagination.search || '';
    let res;
    try {
      res = await this.applyRepository.findAndCount({ 
        where: {
          applyNumber: Like("%"+search+"%"),
          approvalState: 0
        },
        relations: ["course"],
        order: {
          applyId: "DESC"
        },
        skip: (pagination.page-1)*pagination.size || 0,
        take: pagination.size || 10,
      })

      return {
        code: 0,
        message: '查询成功',
        data: res[0],
        total: res[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    }
  }

  // 分页查询接口 联查课程 已完成
  async findAllFinished(pagination): Promise<Object> {
    let search = pagination.search || '';
    let res;
    try {
      res = await this.applyRepository.findAndCount({ 
        where: {
          applyNumber: Like("%"+search+"%"),
          approvalState: 1
        },
        relations: ["course"],
        order: {
          applyId: "DESC"
        },
        skip: (pagination.page-1)*pagination.size || 0,
        take: pagination.size || 10,
      })

      return {
        code: 0,
        message: '查询成功',
        data: res[0],
        total: res[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    }
  }
  // 分页查询接口 联查课程 未完成
  async findAllNotFinished(pagination): Promise<Object> {
    let search = pagination.search || '';
    let res;
    try {
      res = await this.applyRepository.findAndCount({ 
        where: {
          applyNumber: Like("%"+search+"%"),
          approvalState: 2
        },
        relations: ["course"],
        order: {
          applyId: "DESC"
        },
        skip: (pagination.page-1)*pagination.size || 0,
        take: pagination.size || 10,
      })

      return {
        code: 0,
        message: '查询成功',
        data: res[0],
        total: res[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    }
  }

  // 分页查询接口 联查课程
  async findAll(pagination): Promise<Object> {
    let search = pagination.search || '';
    let res;
    try {
      res = await this.applyRepository.findAndCount({ 
        where: {
          applyNumber: Like("%"+search+"%"),
        },
        relations: ["course"],
       
        order: {
          applyId: "DESC"
        },
        skip: (pagination.page-1)*pagination.size || 0,
        take: pagination.size || 10,
      })
      
      return {
        code: 0,
        message: '查询成功',
        data: res[0],
        total: res[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    }
  }

   // 分页查询接口 联查课程 我的所有申报
   async findMy(pagination): Promise<Object> {
    let search = pagination.search || '';
    let res;
    try {
      res = await this.applyRepository.findAndCount({ 
        where: {
          applyNumber: Like("%"+search+"%"),
          stuId: pagination.stuId,
        },
        relations: ["course"],
       
        order: {
          applyId: "DESC"
        },
        skip: (pagination.page-1)*pagination.size || 0,
        take: pagination.size || 10,
      })
      
      return {
        code: 0,
        message: '查询成功',
        data: res[0],
        total: res[1],
        page: pagination.page || 1,
        size: pagination.size || 10,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
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

  async findByUserId(id: string): Promise<object> {
    try {
      const res = await getRepository(Apply)
      .createQueryBuilder("apply")
      .where("apply.stuId = :stuId", { stuId: id })
      // .leftJoinAndSelect("apply.course", "course")
      .getMany()
      return {
        code: 0,
        message: '查询成功',
        data: res || [],
      }
    } catch (error) {
      return {
        code: 0,
        message: '查询失败',
      }
    }
  }
}


