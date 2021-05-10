import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EssayController } from './essay.controller';
import { EssayService } from './essay.service';
import { Essay } from './essay.entity';
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Essay]), UsersModule],
  controllers: [EssayController],
  providers: [EssayService],
  exports: [EssayService],
})
export class EssayModule {}
