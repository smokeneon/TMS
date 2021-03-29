/*
 * @Author: your name
 * @Date: 2021-03-15 16:54:14
 * @LastEditTime: 2021-03-15 16:56:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tms-server/src/login/local-auth.guard.ts
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
