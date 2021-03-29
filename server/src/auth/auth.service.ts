/*
 * @Author: your name
 * @Date: 2021-03-15 16:27:51
 * @LastEditTime: 2021-03-15 16:40:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tms-server/src/auth/auth.service.ts
 */
/**
 * @description: AuthService业务主要处理的检索用户并且验证用户密码，创建validateUser()方法来处理上述任务，更新auth.service.ts
 * @param {*}
 * @return {*}
 */

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
