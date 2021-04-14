import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './users.entity';
import { AuthGuard } from '@nestjs/passport';

class LoginDto {
  @ApiProperty({ description: '用户id', example: '123' })
  username: string

  @ApiProperty({ description: '用户密码', example: '123' })
  password: string
}
@Controller('/api/v1/user')
@ApiTags('用户增删改查')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // @Post('/login')
  // @ApiOperation({ summary: '用户登陆'})
  // async login(@Body() loginDto: LoginDto) {
  //   return await this.usersService.toLogin(loginDto)
  // }

   // JWT验证 - Step 1: 用户请求登录
  @Post('/login')
  @ApiOperation({ summary: '登陆一个用户' })
  async login(@Body() loginParmas: any) {
    console.log('loginParmas', loginParmas);
    
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 0:
        return this.authService.certificate(authResult.user);
      case 1:
        return {
          code: 1,
          message: `账号或密码不正确`,
        };
      default:
        return {
          code: 1,
          message: `查无此人`,
        };
    }
  }

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
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '查询用户列表' })
  async findAll(@Query() pagination: string) {
    return await this.usersService.findAll(pagination);
  }
  
x
  @Get(':id')
  @ApiOperation({ summary: '根据用户id查询详情' })
  async detail(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get('/username/:username')
  @ApiOperation({ summary: '根据用户名查找用户 查询' })
  async findOneByUsername(@Param('username') username: string) {
    try {
      const res = await this.usersService.findOneByUsername(username)
      return res
      // if (res === undefined) {
      //   return {
      //     code: 0,
      //     message: '该用户名可用'
      //   }
      // } else {
      //   return {
      //     code: 1,
      //     message: '用户名已存在'
      //   }
      // }
    } catch (error) {
      return {
        code: 1,
        message: '查询失败'
      }
    }
  }

  @Post('/register')
  @ApiOperation({ summary: '注册一个用户' })
  async register(@Body() user: User) {
    return await this.usersService.register(user);
  }
  // @Query 从req的query获取东西 @Params 从req的params获取东西

  // @Post('/many')
  // async createMany(@Body() users) {
  //   const newUsers = users.map((user) => ({ ...user, status: true }));
  //   await this.usersService.createMany(newUsers);
  //   return true;
  // }
}
