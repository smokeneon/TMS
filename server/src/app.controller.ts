import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


class Login {
  username: string
  password: string
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 做个测试
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/v1/login')
  login(): object {
    return {
      state: 'ok',
      message: '登陆成功',
      type: 'account',
      currentAuthority: 'admin'
    }
  }
}
