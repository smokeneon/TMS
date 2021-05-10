import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity'
// 给数据修改增加时间戳
@Entity()
export class Essay {
  @ApiProperty({ description: '文章id（自动增加生成）', example: 2 })
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  essayId: number;

  @ApiProperty({ description: '文章标题', example: '文章标题' })
  @Column({
    nullable: true,
    type: String,
  })
  title: string;

  @ApiProperty({ description: '文章内容', example: '新建笔记' })
  @Column({
    nullable: true,
    type: "text",
  })
  content;

  @ApiProperty({ description: '用户id', example: '15' })
  @Column({
    nullable: true,
  })
  userId: number;

  @ApiProperty({ description: '图片地址', example: 'http://pic.com' })
  @Column({
    nullable: true,
  })
  imgUrl: string;

  @ApiProperty({ description: '是否开放', example: '默认 false' })
  @Column({
    nullable: false,
    default: false
  })
  isOpen: boolean;

  @ApiProperty({ description: '简介', example: '一段30个字之内的话' })
  @Column({
    nullable: true,
  })
  introduction: string;

  

  @ManyToMany(() => User, (user) => user.applys, {
    eager: true
  })
  @JoinTable()
  user: User[];
  
  
  @ApiProperty({ description: '更新时间', example: '2021-05-21' })
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  timeStamp: Date;
  
}
