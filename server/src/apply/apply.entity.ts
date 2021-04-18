import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../course/course.entity'
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

  @ApiProperty({ description: '参训者id', example: '23' })
  @Column('varchar')
  userId: string;

  @ManyToOne(() => Course, (course) => course.applys, {
    eager: true,
  })
  course: Course

  @ApiProperty({ description: '申报状态 默认0 0:未提交 1:审批中 2: 申报成功 3:申报失败 4:进行中 5.已完结', example: 0 })
  @Column({
    default: 0,
  })
  approvalState: number;

  @ApiProperty({ description: '课程分数', example: '98' })
  @Column({
    nullable: true,
  })
  score: number;
  
}
