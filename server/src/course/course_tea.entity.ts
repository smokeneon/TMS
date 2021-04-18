import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CourseTea {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '课程专家关联表id', example: 2 })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({ description: '专家id', example: 2 })
  teaId: string;

  @Column({
    nullable: false,
  })
  @ApiProperty({ description: '课程id', example: 2 })
  courseId: string;
}
