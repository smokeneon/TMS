/*
 * @Author: your name
 * @Date: 2021-02-25 17:33:45
 * @LastEditTime: 2021-03-15 16:38:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tms-server/src/users/users.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: '用户id', example: '123' })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: '用户名', example: 'zhangsan' })
  @Column('varchar')
  username: string;

  

  @ApiProperty({ description: '姓名', example: '张三' })
  @Column({
    nullable: true,
  })
  realname: string;

  @ApiProperty({ description: '密码', example: 'ceshi123mima' })
  @Column('varchar')
  password: string;

  @ApiProperty({ description: '编号', example: '234567' })
  @Column({
    nullable: true,
  })
  stuNum: string;

  @ApiProperty({ description: '身份', example: 'stu' })
  @Column('varchar')
  identity: string;

  @ApiProperty({ description: '邮箱', example: '123@qq.com' })
  @Column('varchar')
  email: string;
}
