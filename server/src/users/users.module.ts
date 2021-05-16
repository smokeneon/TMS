/*
 * @Author: your name
 * @Date: 2021-02-24 17:01:02
 * @LastEditTime: 2021-03-15 16:29:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tms-server/src/users/users.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
