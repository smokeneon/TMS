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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const auth_service_1 = require("../auth/auth.service");
const users_entity_1 = require("./users.entity");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async login(loginParmas) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
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
    async create(user) {
        return await this.usersService.create(user);
    }
    async remove(id) {
        return await this.usersService.remove(id);
    }
    async update(id, body) {
        return await this.usersService.edit(id, body);
    }
    async findAll(pagination) {
        return await this.usersService.findAll(pagination);
    }
    async findJoinAll(pagination) {
        return await this.usersService.findJoinAll(pagination);
    }
    async findDetailById(id) {
        return await this.usersService.getDetails(id);
    }
    async findAllNoPagination1() {
        let type = 'tea';
        return await this.usersService.findAllNoPagination(type);
    }
    async findAllNoPagination2() {
        let type = 'stu';
        return await this.usersService.findAllNoPagination(type);
    }
    async detail(id) {
        return await this.usersService.findOne(id);
    }
    async findOneByUsername(username) {
        try {
            const res = await this.usersService.findOneByUsername(username);
            return res;
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败'
            };
        }
    }
    async register(user) {
        return await this.usersService.register(user);
    }
    async RegisterUsername(username) {
        try {
            const res = await this.usersService.findOneByUsername(username);
            if (typeof (res) === 'undefined') {
                return {
                    code: 0,
                    message: '用户名可用'
                };
            }
            else {
                return {
                    code: 2,
                    message: '用户名已占用'
                };
            }
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败'
            };
        }
    }
};
__decorate([
    common_1.Post('/login'),
    swagger_1.ApiOperation({ summary: '登陆一个用户' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    common_1.Post('/add'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '增加一个用户' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '删除一个用户' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '编辑一个用户' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查询用户列表 带分页' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Get('/joinAll'),
    swagger_1.ApiOperation({ summary: '查询用户列表 带分页 带课程以及申报表 ' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findJoinAll", null);
__decorate([
    common_1.Get('/detail/:id'),
    swagger_1.ApiOperation({ summary: '根据用户id查询用户详情 带申报表以及课程表 ' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findDetailById", null);
__decorate([
    common_1.Get('/tea'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '查询教师列表 不带分页' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllNoPagination1", null);
__decorate([
    common_1.Get('/stu'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '查询教师列表 不带分页' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllNoPagination2", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '根据用户id查询详情' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "detail", null);
__decorate([
    common_1.Get('/username/:username'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '根据用户名查找用户 查询' }),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneByUsername", null);
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiOperation({ summary: '注册一个用户' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    common_1.Get('/register/:username'),
    swagger_1.ApiOperation({ summary: '根据用户名查找用户 查询' }),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "RegisterUsername", null);
UsersController = __decorate([
    common_1.Controller('/api/v1/user'),
    swagger_1.ApiTags('用户增删改查'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map