import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.usersRepository.insert(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async edit(id: number, user: User): Promise<boolean> {
    const res = await this.usersRepository.update(id, user);
    return true;
    // return await this.usersRepository.update();
  }
  // 分页查询接口
  async findAll(pagination): Promise<Object> {
    const users = await getRepository(User)
    // createQueryBuilder 创建一个查询构建器 可用于查询
      .createQueryBuilder('user')
      .skip((pagination.page-1)*pagination.size || 0)
      .take(pagination.size || 10)
      .getManyAndCount()
    return {
      code: 0,
      data: users[0],
      page: pagination.page,
      size: pagination.size,
      total: users[1],
    }
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }
}
