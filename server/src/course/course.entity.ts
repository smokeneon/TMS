import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @ApiProperty({ description: '课程id（前台生成）', example: 2 })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @ApiProperty({ description: '开课教师', example: '老王' })
  @Column('varchar')
  teacher: string;


  @ApiProperty({ description: '所属教师用户id 必填', example: 23 })
  @Column({
    nullable: false,
  })
  courseByTeaId: number;

  @ApiProperty({ description: '开课状态 默认0 0:未开课，1:进行中，2:已完结', example: 0 })
  @Column({
    default: 0,
  })
  openState: number;

  @ApiProperty({ description: '申报状态状态 默认0 0:未申报，1:已申报', example: 0 })
  @Column({
    default: 0,
  })
  applyState: number;

  @ApiProperty({ description: '申报人id', example: '12' })
  @Column({
    nullable: true,
  })
  applicantId: number;

  @ApiProperty({ description: '申报人用户名', example: 'heihei' })
  @Column('varchar')
  applicantUsername: number;

}
