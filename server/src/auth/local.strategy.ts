// 针对无身份的登陆用
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('走到这里了');
    
    // tslint:disable-next-line
    return {username, password};
    // const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new HttpException(
    //     { message: 'authorized failed', error: 'please try again later.' },
    //     HttpStatus.BAD_REQUEST);
    // }
    // return user;
  }
}
