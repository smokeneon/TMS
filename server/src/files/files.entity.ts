import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity'
import { Course } from '../course/course.entity'
// 给数据修改增加时间戳
@Entity()
export class Files {
  @ApiProperty({ description: '文件id（自动增加生成）', example: 2 })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  fileId: number;

  @ApiProperty({ description: '文件路径', example: '/dist/2021/05/11/xxx.png' })
  @Column({
    nullable: true,
    type: String,
  })
  path: string;

  @ApiProperty({ description: '上传者id', example: '15' })
  @Column({
    nullable: true,
  })
  userId: number;

  @ApiProperty({ description: '课程id', example: '16' })
  @Column({
    nullable: true,
  })
  courseId: number;

  @ApiProperty({ description: '创建时间 自动生成', example: '...' })
  @CreateDateColumn()
  createTime;

  @ApiProperty({ description: '更新时间 自动生成', example: '...' })
  @UpdateDateColumn()
  updateTime;
  

  @ManyToMany(() => User, (user) => user.files, {
    eager: true
  })
  @JoinTable()
  users: User[];

  @ManyToMany(() => Course, (course) => course.files, {
    eager: true
  })
  @JoinTable()
  courses: Course[];
  
  // @ApiProperty({ description: '更新时间', example: '2021-05-21' })
  // @Column({
  //   nullable: true,
  //   type: 'timestamp',
  //   default: () => "CURRENT_TIMESTAMP",
  // })
  // timeStamp: Date;
  
}
