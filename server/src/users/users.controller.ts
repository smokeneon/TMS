import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.entity';
class PageBody  {
  page: number;
  size: number;
}
@Controller('user')
@ApiTags('user增删改查')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add')
  @ApiOperation({ summary: '增加一个用户' })
  async create(@Body() user: User) {
    return await this.usersService.create(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除一个用户' })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑一个用户' })
  async update(@Param('id') id: number, @Body() body: User) {
    return await this.usersService.edit(id, body);
  }

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  async findAll(@Query() pagination: string) {
    console.log('query', pagination);
    const data = await this.usersService.findAll(pagination)
    
    return await this.usersService.findAll(pagination);
    // const user = await this.usersService.findAll()
    // return {
    //   data: user,
    //   page: 1,
    //   size: 10,
    // }
  }

  @Get(':id')
  @ApiOperation({ summary: '根据用户id查询详情' })
  async detail(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  // @Query 从req的query获取东西 @Params 从req的params获取东西

  // @Post('/many')
  // async createMany(@Body() users) {
  //   const newUsers = users.map((user) => ({ ...user, status: true }));
  //   await this.usersService.createMany(newUsers);
  //   return true;
  // }
}
