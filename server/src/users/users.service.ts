import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import { makeSalt, encryptPassword } from '../utils/cryptogram'
import { Course } from 'src/course/course.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<any> {
    const hasUser = await this.findOneByUsername(user.username);
    if (hasUser) {
      return {
        code: 1,
        status: 400,
        message: '用户已存在',
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(user.password, salt);  // 加密密码
    let d = new Date()
    let newUser = {
      ...user,
      stuNum: d.getTime().toString(),
      password: hashPwd,
      pwd_salt: salt,
    }
    try {
      await this.usersRepository.insert(newUser);
      return {
        code: 0,
        message: '添加成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '添加失败'
      }
    }
    
  }

  async remove(userId: string): Promise<any> {
    let userDetail = await this.getDetails(userId);
    if (userDetail.code === 0) {
      if (userDetail.data.courses.length != 0) {
        return {
          code: 2,
          message: '当前用户存在课程记录，无法删除！'
        }
      }

      if (userDetail.data.files.length != 0) {
        return {
          code: 2,
          message: '当前用户存在文件记录，无法删除！'
        }
      }
    }
    
    try {
      const res = await this.usersRepository.delete(userId);
      
      if (res.affected === 1) {
        return {
          code: 0,
          message: '删除成功'
        }
      }
      return {
        code: 1,
        message: '删除失败'
      }
    } catch (error) {
      return {
        code: 1,
        message: '删除失败',
        error
      }
    }
    
  }

  async findPass(user): Promise<any> {
    let account;
    // console.log('user', user);
    
    try {
      account = await this.usersRepository.findOne({
        where: { username: user.username },
      })
      if (typeof(account) == "undefined") {
        return {
          code: 1,
          message: '未找到账户信息，请检查用户名'
        }
      } 
      // 判断用户验证的邮箱是否和数据库匹配
      if (account.email != user.email) {
       return {
        code: 1,
        message: '用户邮箱不匹配，请检查用户名或邮箱'
       }
      }

      try {
        // 加盐
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(String(user.password), salt);  // 加密密码
        await this.usersRepository.update(account.userId, { password: hashPwd, pwd_salt: salt });
        return {
          code: 0,
          message: '更新密码成功'
        }
      } catch (error) {
        return {
          code: 1,
          message: '找回密码失败',
          error
        }
      }
      
    } catch (error) {
      
    }
    return {
      ceshi: '找回密码'
    }
  }
  async edit(id: number, user: User): Promise<any> {
    try {
      await this.usersRepository.update(id, user);
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
    let user;
    try {
      
      if (pagination.search) {
        user = await getRepository(User)
          .createQueryBuilder('user')
          .where("user.identity like :identity", { identity: pagination.type || '%%'})
          .andWhere("user.username like :username", { username: '%' + pagination.search + '%' || '%%' })
          .orderBy("user.userId","DESC")
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      } else {
        user = await getRepository(User)
          .createQueryBuilder('user')
          .where("user.identity like :identity", { identity: pagination.type || '%%'})
          .orderBy("user.userId","DESC")
          .skip((pagination.page-1)*pagination.size || 0)
          .take(pagination.size || 10)
          .getManyAndCount()
      }

      return {
        code: 0,
        data: user[0],
        page: parseInt(pagination.page) || 1,
        size: parseInt(pagination.size) || 10,
        total: user[1],
      }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error
      }
    } 
  }

  // 查询个人详情
  // 失效
  async getDetails(id): Promise<any> {
    let user;
    try {
      user = await this.usersRepository.findOne({
        where: { userId: id,  },
        relations: ["courses","files"],
      })
      
      return {
        code: 0,
        message: '查询成功',
        data: user,
      }
      
    } catch (error) {
      return {
        code: 1,
        message: '查询失败',
        error,
      }
    }
  }
   // 分页查询接口 连接
  async findJoinAll(pagination): Promise<Object> {
  let user;
  try {
    user = await this.usersRepository.findAndCount({ 
      relations: ["courses", "applys"],
      skip: (pagination.page-1)*pagination.size || 0,
      take: pagination.size || 10,
    })
    
    return {
      code: 0,
      message: '查询成功',
      data: user[0],
      total: user[1],
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

  async findAllNoPagination(type): Promise<any> {
    
    let user;
    try {
      user = await getRepository(User)
          .createQueryBuilder('user')
          .where("user.identity = :type", {type: type || 'tea'})
          .getManyAndCount()
    return {
      code: 0,
      data: user[0],
      message: '查询成功'
    }
    } catch (error) {
      return {
        code: 1,
        data: [],
        message: '查询失败'
      }
    }
  }

  // 目测查不出来
  async findOne(id: string): Promise<object> {
    try {
      const res = await this.usersRepository.findOne(id);
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

  async findOneByUsername(username: string): Promise<User> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where("user.username = :username", { username: username })
      .getOne()
    return user
  }
  // async findOneUnique(username: string): Promise<any> {
  //   return this.usersRepository.find(user => user.username === username);
  // }
  async register(user: User): Promise<any> {
    const hasUser = await this.findOneByUsername(user.username);
    if (hasUser) {
      return {
        code: 1,
        status: 400,
        message: '用户已存在',
      };
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(user.password, salt);  // 加密密码
    let d = new Date()
    let newUser = {
      ...user,
      stuNum: d.getTime().toString(),
      password: hashPwd,
      pwd_salt: salt,
    }
    try {
      await this.usersRepository.insert(newUser);
      return {
        code: 0,
        message: '注册成功'
      }
    } catch (error) {
      return {
        code: 1,
        message: '注册失败'
      }
    }
  }

  async toLogin(login): Promise<any> {
    
    try {
      const findUser = await getRepository(User)
      .createQueryBuilder('user')
      .where("user.username = :username", { username: login.username })
      .getOne()

      if (typeof(findUser) === 'undefined' ) {
        return {
          code: 1,
          message: '用户不存在',
          state: 'userNotFound',
        }
      } else {
        if(login.password === findUser.password) {
          delete findUser.password;
          return {
            code: 0,
            message: '登陆成功',
            state: 'ok',
            data: findUser
          } 
        } else {
          return {
            code: 1,
            message: '用户名或密码错误',
            state: 'passwordError'
          }
        }
      }
    } catch (error) {
      return {
        code: 1,
        message: '登陆失败',
      }
    }

  }
}
