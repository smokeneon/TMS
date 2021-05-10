import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Essay } from './essay.entity'
import { UsersService } from '../users/users.service'
import { Repository } from 'typeorm';

@Injectable()
export class EssayService {
  constructor(
    @InjectRepository(Essay)
    private essayRepository: Repository<Essay>,
    private readonly usersService: UsersService
  ) {}

  async create(essay, manager): Promise<any> {
    
    // 截取30个字的简介 如果不够 则只要前面那一部分
    const getString = (s,n) => {
      if (s.length < n) {
        s =  delHtmlTag(s);  //html替换
      }
      if(s.length > n){
          return s.substring(0,n);
      }
      return s; 
    }  
    const delHtmlTag = (str) => {
        return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
    } 
    let intro = getString(essay.content, 30)

    let getUser;
    // 新增
    if (essay.firstEssay === 'yes') {
    
     
      try {
        getUser = await this.usersService.findOne(essay.userId)
  
        let newEssay = {
          ...essay,
          user: [getUser.data],
          introduction: intro
        }
        try {
          let addedEssay = await manager.save(Essay, newEssay);
          return {
            code: 0,
            message: '笔记新增成功',
            data: {
              essayId: addedEssay.essayId
            }
          }
        } catch (error) {
          return {
            code: 1,
            message: '笔记插入失败', 
            error
          }
        }
  
      } catch (error) {
        return {
          code: 1,
          message: '用户查询失败', 
          error
        }
      }
    } 
    //更新
    if (essay.firstEssay === 'no') {
      try {
        await manager.update(Essay, {essayId: essay.essayId}, { content: essay.content, title: essay.title, introduction: intro })
        
        return {
          code: 0,
          message: '笔记保存成功',
          data: {
            essayId: essay.essayId
          }
        }
      } catch (error) {
        return {
          code: 1,
          message: '笔记更新失败', 
          error
        }
      }
    }
  }   

 
  async findByUserId(userId, manager): Promise<any> {
    let res;
    try {
      res = await this.essayRepository.findAndCount({ 
        where: {
          userId: userId,
        }
      })
      // 删除content字段
      let _new_arr_ = res["0"].map((item)=>{
        return Object.keys(item).reduce((obj,key)=>{
            if(key==='content') return obj;
            obj[key] = item[key];
            return obj;
        },{});
      });
    
      return {
        code: 0,
        message: '查询笔记列表成功',
        data: _new_arr_
      }
      
    } catch (error) {
      return {
        code: 1,
        message: '查询笔记列表失败'
      }
    }
  }

  async detail(essayId, manager): Promise<any> {
    let res
    try {
      res = await this.essayRepository.findOne({ 
        where: {
          essayId: essayId,
        }
      })
      return {
        code: 0,
        message: '获取课程详情成功',
        data: res,
      }
    } catch (error) {
      return {
        code: 1,
        message: '获取课程详情失败',
        error
      }
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const res = await this.essayRepository.delete(id);
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

}


