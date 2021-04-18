/*
 * @Author: your name
 * @Date: 2021-02-25 17:33:45
 * @LastEditTime: 2021-03-15 16:38:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tms-server/src/users/users.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Course } from '../course/course.entity'
@Entity()
export class User {
  @ApiProperty({ description: '用户id', example: '123' })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  userId: number;

  @ApiProperty({ description: '用户名', example: 'zhangsan' })
  @IsNotEmpty({ message: '请填写用户名' })
  @Column('varchar')
  username: string;

  

  @ApiProperty({ description: '姓名', example: '张三' })
  @Column({
    nullable: true,
  })
  realname: string;

  @ApiProperty({ description: '密码', example: 'ceshi123mima' })
  @Column('varchar')
  @IsNotEmpty({ message: '请填写密码' })
  password: string;

  @ApiProperty({ description: '密码盐', example: '前端无需填写'})
  @Column({
    nullable: true,
  })
  pwd_salt: string;

  @ApiProperty({ description: '编号', example: '234567' })
  @Column({
    nullable: true,
  })
  stuNum: string;

  @ApiProperty({ description: '身份', example: 'stu' })
  @Column('varchar')
  @IsNotEmpty({ message: '请填写身份' })
  identity: string;

  @ApiProperty({ description: '邮箱', example: '123@qq.com' })
  @IsNotEmpty({ message: '请填写邮箱' })
  @Column('varchar')
  email: string;

  @ManyToMany(() => Course, (course) => course.users)
  courses: Course[];
  // @OneToMany(type => Course, course => course.user)
  // courses: Course[];
}
