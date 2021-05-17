import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../course/course.entity'
import { User } from '../users/users.entity'

// 给数据修改增加时间戳
@Entity()
export class Apply {
  @ApiProperty({ description: '申报id（自动增加生成）', example: 2 })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  applyId: number;

  @ApiProperty({ description: '申报号 必填（前端生成）', example: '20210402001' })
  @Column({
    nullable: false,
    type: String,
  })
  applyNumber: string;

  @ApiProperty({ description: '学生id', example: '15' })
  @Column({
    nullable: true,
  })
  stuId: number;


  @ApiProperty({ description: '课程id', example: '15' })
  @Column({
    nullable: true,
  })
  courseId: number;

  // @ApiProperty({ description: '参训者id', example: '23' })
  // @Column('varchar')
  // userId: string;

  @ManyToOne(() => Course, (course) => course.applys, {
    eager: true,
  })
  course: Course

  @ManyToMany(() => User, (user) => user.applys, {
    eager: true
  })
  @JoinTable()
  stu: User[];
  
  
  // @ManyToMany(() => User, {
  //   eager: true
  // })
  // @JoinTable()
  // stu: User[];


  @ApiProperty({ description: '申报状态 默认0 0:进行中 1:已完成 2: 未完成 ', example: 0 })
  @Column({
    default: 0,
  })
  approvalState: number;

  @ApiProperty({ description: '课程分数', example: '98' })
  @Column({
    nullable: true,
    default: -1,
  })
  score: number;

  @ApiProperty({ description: '更新时间', example: '2021-05-21' })
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  timeStamp: Date;
  

  @ApiProperty({ description: '创建时间 自动生成', example: '...' })
  @CreateDateColumn()
  createTime;

  @ApiProperty({ description: '更新时间 自动生成', example: '...' })
  @UpdateDateColumn()
  updateTime;
}
