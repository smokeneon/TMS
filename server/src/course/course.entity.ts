import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Apply } from '../apply/apply.entity'
import { User } from '../users/users.entity'
@Entity()
export class Course {
  @ApiProperty({ description: '课程id（前台生成）', example: 2 })
  @PrimaryGeneratedColumn()
  courseId: number;

  @ApiProperty({ description: '课程名 必填', example: '物理学概况' })
  @Column({
    nullable: false,
    type: String,
  })
  courseName: string;

  @ApiProperty({ description: '所属学科', example: '物理学' })
  @Column('varchar')
  subject: string;

  @ApiProperty({ description: '课程背景', example: '是一门历史悠久的学科' })
  @Column('varchar')
  coureseBackground: string;

  @ApiProperty({ description: '课程目标', example: '把你打造成改变世界的物理学者'})
  @Column('varchar')
  courseTarget: string;

  @ApiProperty({ description: '课程架构', example: '一周理论，一周实操' })
  @Column('varchar')
  courseFramework: string;

  @ApiProperty({ description: '专家id', example: '21' })
  @Column({
    nullable: true,
  })
  teaId: number;


  @ApiProperty({ description: '开课状态 默认0 0:未开课，1:进行中，2:已完结', example: 0 })
  @Column({
    default: 0,
  })
  openState: number;

  @ApiProperty({ description: '审批状态状态 默认0 0:未提交 1:审批中 2: 审批成功 3:审批失败', example: 0 })
  @Column({
    default: 0,
  })
  approvalState: number;

  @ApiProperty({ description: '开课时间 起始', example: 0 })
  @Column({
    nullable: true,
  })
  startDate: string;

  @ApiProperty({ description: '开课时间 结束', example: 0 })
  @Column({
    nullable: true,
  })
  endDate: string;

  @ApiProperty({ description: '地址', example: 0 })
  @Column({
    nullable: true,
  })
  address: string;

 
  // @ApiProperty({ description: '创建时间', example: '2021-04-14T17:57:59.844Z'})
  // @Column('varchar')
  // createTime: string;

  @OneToMany(() => Apply, (apply) => apply.course) // note: we will create author property in the Photo class below
  applys: Apply[];

  @ManyToMany(() => User, user => user.courses, {
    eager: true
  })
  @JoinTable()
  users: User[];
  // @ManyToMany(() => User, {
  //   eager: true
  // })
  // @JoinTable()
  // users: User[];

}
