"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const cryptogram_1 = require("../utils/cryptogram");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        console.log('JWT验证 - Step 2: 校验用户信息');
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const hashedPassword = user.password;
            const salt = user.pwd_salt;
            const hashPassword = cryptogram_1.encryptPassword(password, salt);
            if (hashedPassword === hashPassword) {
                return {
                    code: 0,
                    message: '密码正确',
                    user,
                };
            }
            else {
                return {
                    code: 1,
                    message: '密码错误',
                    user: null,
                };
            }
        }
        return {
            code: 2,
            message: '查无此人',
            user: null,
        };
    }
    async certificate(user) {
        const payload = {
            username: user.username,
            sub: user.userId,
            realName: user.realName,
            role: user.identity,
        };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');
        try {
            const token = this.jwtService.sign(payload);
            let newUser = Object.assign(Object.assign({}, user), { password: '', pwd_salt: '' });
            return {
                code: 0,
                data: {
                    token,
                    user: newUser,
                },
                msg: `登录成功`,
            };
        }
        catch (error) {
            return {
                code: 1,
                msg: `账号或密码错误`,
            };
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map