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

  @ApiProperty({ description: '文章内容', example: '新建笔记' })
  @Column({
    nullable: false,
    type: String,
  })
  content: string;

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
