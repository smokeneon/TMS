import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Like, Not, Repository } from 'typeorm';
import { Course } from './course.entity'
import { UsersService } from '../users/users.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async hotCourses(manager): Promise<any> {
    try {
      let res =  await manager.query(`select course.courseName, a.mount from (select courseCourseId as courseCourseId, count(*) as mount from apply group by courseCourseId ) a inner join course  on a.courseCourseId=course.courseId`);
      
      return  {
       code: 0,
       message: '查询热门课程成功',
       data: res,
     }
     } catch (error) {
       return {
         code: 1,
         message: '查询热门课程失败',
         error
       }
     }
  }
  async create(course, manager): Promise<any> {
    
    try {
      // 上传的数据 一部分course  一部分 开课专家名字
      // 1. 开课庄稼  --  User
      // 2. course 一部分用上传的数据填充 users开课专家对象
      // 3. save
      let user = await this.usersService.findOne(course.teaId)
      if (!user["data"]){
        return {
          code: 0,
          message: '该专家不存在'
        }
      }
      let newCourse = {
        ...course,
        users: [user["data"]],
        teaId: course.teaId,
      }
      try {
        let saveCourse = await manager.save(Course, newCourse);
        if (!saveCourse){
          throw new Error("insert error")
        }
      } catch (error) {
        return {
          code: 1,
          message: '添加课程失败',
          error,
        }
      }
      return {
        code: 0,
        message: '新建课程成功'
      }  
    } catch (error) {
      return {
        code: 1,
        message: '新建课程失败'
      }
    }
  }

  async remove(courseId: string): Promise<object> {
    try {
      const res = await this.courseRepository.delete(courseId);
      
      if (res.affected === 1) {
        return {
          code: 0,
          message: '删除成功'
        }
      }
    } catch (error) {
      if (error.errno === 1451) {
        return {
          code: 1,
          message: '该项目有申报表不可删除',
          error
        }
      }
      return {
        code: 1,
        message: '删除失败',
        error
      }
    }
  }

  async changeApprovalState(body, manager): Promise<any> {
    try {
      const course = await manager.find(Course, { courseId: body.courseId });
      
      let approvalState = Number(body.approvalState)
      let newCourse = {
        ...course["0"],
        approvalState: approvalState,
      }
      delete newCourse.users
      
      try {
        let saveCourse = await manager.update(Course, {courseId: body.courseId}, newCourse)
        if (!saveCourse){
          throw new Error("更新 error")
        }
      } catch (error) {
        return {
          code: 1,
          message: '更新课程审批状态失败',
          error,
        }
      }
      const ApprovalState = {
        0: '未提交',
        1: '审批中',
        2: '审批成功',
        3: '审批失败',
      }
      await this.emailService.sendMailToUser(
        course["0"].users["0"].email, 
        `你申报的${course["0"].courseName}, 管理员已更新状态为${ApprovalState[Number(body.approvalState)]}, 请登陆系统查看。 详情请登陆http://www.tms.leondon.cn`
        )

      return {
        code: 0,
        message: '更新课程审批状态成功'
      }  
      
    } catch (error) {
      
    }
  
  }

  async changeOpeningState(body, manager): Promise<any> {
    try {
      const course = await manager.find(Course, { courseId: body.courseId });
      let openState = Number(body.openState)
      let newCourse = {
        ...course["0"],
        openState: openState,
      }
      delete newCourse.users
      
      try {
        let saveCourse = await manager.update(Course, {courseId: body.courseId}, newCourse)
        if (!saveCourse){
          throw new Error("更新 error")
        }
      } catch (error) {
        return {
          code: 1,
          message: '更新课程审批状态失败',
          error,
        }
      }
      return {
        code: 0,
        message: '更新课程审批状态成功'
      }  
      
    } catch (error) {
      
    }
  
  }
  async edit(id, course, manager): Promise<object> {
    try {
      // 上传的数据 一部分course  一部分 开课专家名字
      // 1. 开课庄稼  --  User
      // 2. course 一部分用上传的数据填充 users开课专家对象
      // 3. save
      let user = await this.usersService.findOne(course.teaId)
      if (!user["data"]){
        return {
          code: 0,
          message: '该专家不存在'
        }
      }
      // let newCourse = {
      //   ...course,
      //   users: [user["data"]],
      // }
      try {
        let saveCourse = await manager.update(Course, {courseId: id}, course)
        if (!saveCourse){
          throw new Error("insert error")
        }
      } catch (error) {
        return {
          code: 1,
          message: '编辑课程失败',
          error,
        }
      }
      return {
        code: 0,
        message: '编辑课程成功'
      }  
    } catch (error) {
      return {
        code: 1,
        message: '编辑课程失败'
      }
    }
  }

   
  // 申报表调用
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
  // 根据课程id查询课程详情
  async getDetails(id): Promise<any> {
    let course; 
    try {
      course = await this.courseRepository.findOne({
        relations: ["users", "applys"],
        where: {courseId: id},
      })
      return {
        code: 0,
        message: '查询成功',
        data: course,
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    }
  }
  // 查询列表以及连带的申请表
  async getList(pagination): Promise<any> {
    let search = pagination.search || '';
    let course;
    try {
        course = await this.courseRepository.findAndCount({ 
          where: {
            courseName: Like("%"+search+"%"),
          },
          relations: ["users","applys"],
          skip: (pagination.page-1)*pagination.size || 0,
          take: pagination.size || 10,
        })
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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

  // 查询列表以及连带的申请表 审批过的
  async getApprovedList(pagination): Promise<any> {
    let search = pagination.search || '';
    let course;
    try {
        course = await this.courseRepository.findAndCount({ 
          where: {
            courseName: Like("%"+search+"%"),
            approvalState: Not(0)
          },
          relations: ["users","applys"],
          skip: (pagination.page-1)*pagination.size || 0,
          take: pagination.size || 10,
        })
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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

  // 查询列表以及连带的申请表 未审批的
  async getNotApprovedList(pagination): Promise<any> {
    let search = pagination.search || '';
    let course;
    try {
        course = await this.courseRepository.findAndCount({ 
          where: {
            courseName: Like("%"+search+"%"),
            approvalState: 1
          },
          relations: ["users","applys"],
          skip: (pagination.page-1)*pagination.size || 0,
          take: pagination.size || 10,
        })
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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

  async getCanApplyList(pagination): Promise<any> {
    let search = pagination.search || '';
    let course;
    try {
        course = await this.courseRepository.findAndCount({ 
          where: {
            courseName: Like("%"+search+"%"),
            openState: 1,
            approvalState: 2,
          },
          relations: ["users","applys"],
          skip: (pagination.page-1)*pagination.size || 0,
          take: pagination.size || 10,
        })
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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

  async getListByTeaId(pagination): Promise<any> {
    let search = pagination.search || '';
    let course;
    try {
        course = await this.courseRepository.findAndCount({ 
          where: {
            courseName: Like("%"+search+"%"),
            teaId: pagination.teaId,
          },
          relations: ["users","applys"],
          skip: (pagination.page-1)*pagination.size || 0,
          take: pagination.size || 10,
        })
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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
  

  // 查询所有 无分页
  async findAllWithNoPage(): Promise<any> {
    let course;
    try {
      course = await getRepository(Course)
      .createQueryBuilder('course')
      .where("course.openState = :state", { state: 1 })
      .getMany()
      return {
        code: 0,
        message: '查询成功',
        data: course
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败'
      }
    }
  }

  async getPie(manager): Promise<any> {
    try {
     let res =  await manager.query(`SELECT subject x, count(*) y FROM course GROUP BY subject`);
    return  {
      code: 0,
      message: '查询图表信息成功',
      data: res
    }
    } catch (error) {
      return {
        code: 1,
        message: '查询图表信息失败',
        error
      }
    }
  }

   // 分页查询接口
   async findAll(pagination): Promise<Object> {
    let search = pagination.search || '';
    let course;
    try {
        course = await getRepository(Course)
        .createQueryBuilder('course')
        .where("course.courseName like :courseName", { courseName: '%' + search + '%' || '%%'})
        .leftJoinAndSelect("course.applys", "applys")
        .leftJoinAndSelect("course.users", "users")
        .skip((pagination.page-1)*pagination.size || 0)
        .take(pagination.size || 10)
        .getManyAndCount()
      return {
        code: 0,
        message: '查询成功',
        data: course[0],
        total: course[1],
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

  
}


