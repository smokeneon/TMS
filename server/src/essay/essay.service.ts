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
    let getUser;
    console.log('essay', essay);
    
    // 新增
    if (essay.firstEssay === 'yes') {
      try {
        getUser = await this.usersService.findOne(essay.userId)
  
        let newEssay = {
          ...essay,
          user: [getUser.data],
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
        await manager.update(Essay, {essayId: essay.essayId}, { content: essay.content, })
        
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
}


