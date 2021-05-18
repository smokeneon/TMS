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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const cryptogram_1 = require("../utils/cryptogram");
const course_entity_1 = require("../course/course.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const hasUser = await this.findOneByUsername(user.username);
        if (hasUser) {
            return {
                code: 1,
                status: 400,
                message: '用户已存在',
            };
        }
        const salt = cryptogram_1.makeSalt();
        const hashPwd = cryptogram_1.encryptPassword(user.password, salt);
        let d = new Date();
        let newUser = Object.assign(Object.assign({}, user), { stuNum: d.getTime().toString(), password: hashPwd, pwd_salt: salt });
        try {
            await this.usersRepository.insert(newUser);
            return {
                code: 0,
                message: '添加成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '添加失败'
            };
        }
    }
    async remove(userId) {
        let userDetail = await this.getDetails(userId);
        if (userDetail.code === 0) {
            if (userDetail.data.courses.length != 0) {
                return {
                    code: 2,
                    message: '当前用户存在课程记录，无法删除！'
                };
            }
            if (userDetail.data.files.length != 0) {
                return {
                    code: 2,
                    message: '当前用户存在文件记录，无法删除！'
                };
            }
        }
        try {
            const res = await this.usersRepository.delete(userId);
            if (res.affected === 1) {
                return {
                    code: 0,
                    message: '删除成功'
                };
            }
            return {
                code: 1,
                message: '删除失败'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '删除失败',
                error
            };
        }
    }
    async findPass(user) {
        let account;
        try {
            account = await this.usersRepository.findOne({
                where: { username: user.username },
            });
            if (typeof (account) == "undefined") {
                return {
                    code: 1,
                    message: '未找到账户信息，请检查用户名'
                };
            }
            if (account.email != user.email) {
                return {
                    code: 1,
                    message: '用户邮箱不匹配，请检查用户名或邮箱'
                };
            }
            try {
                const salt = cryptogram_1.makeSalt();
                const hashPwd = cryptogram_1.encryptPassword(String(user.password), salt);
                await this.usersRepository.update(account.userId, { password: hashPwd, pwd_salt: salt });
                return {
                    code: 0,
                    message: '更新密码成功'
                };
            }
            catch (error) {
                return {
                    code: 1,
                    message: '找回密码失败',
                    error
                };
            }
        }
        catch (error) {
        }
        return {
            ceshi: '找回密码'
        };
    }
    async edit(id, user) {
        try {
            await this.usersRepository.update(id, user);
            return {
                code: 0,
                message: '更新成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '更新失败'
            };
        }
    }
    async findAll(pagination) {
        let user;
        try {
            if (pagination.search) {
                user = await typeorm_2.getRepository(users_entity_1.User)
                    .createQueryBuilder('user')
                    .where("user.identity like :identity", { identity: pagination.type || '%%' })
                    .andWhere("user.username like :username", { username: '%' + pagination.search + '%' || '%%' })
                    .orderBy("user.userId", "DESC")
                    .skip((pagination.page - 1) * pagination.size || 0)
                    .take(pagination.size || 10)
                    .getManyAndCount();
            }
            else {
                user = await typeorm_2.getRepository(users_entity_1.User)
                    .createQueryBuilder('user')
                    .where("user.identity like :identity", { identity: pagination.type || '%%' })
                    .orderBy("user.userId", "DESC")
                    .skip((pagination.page - 1) * pagination.size || 0)
                    .take(pagination.size || 10)
                    .getManyAndCount();
            }
            return {
                code: 0,
                data: user[0],
                page: parseInt(pagination.page) || 1,
                size: parseInt(pagination.size) || 10,
                total: user[1],
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败',
                error
            };
        }
    }
    async getDetails(id) {
        let user;
        try {
            user = await this.usersRepository.findOne({
                where: { userId: id, },
                relations: ["courses", "files"],
            });
            return {
                code: 0,
                message: '查询成功',
                data: user,
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败',
                error,
            };
        }
    }
    async findJoinAll(pagination) {
        let user;
        try {
            user = await this.usersRepository.findAndCount({
                relations: ["courses", "applys"],
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: user[0],
                total: user[1],
                page: pagination.page || 1,
                size: pagination.size || 10,
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败',
                error
            };
        }
    }
    async findAllNoPagination(type) {
        let user;
        try {
            user = await typeorm_2.getRepository(users_entity_1.User)
                .createQueryBuilder('user')
                .where("user.identity = :type", { type: type || 'tea' })
                .getManyAndCount();
            return {
                code: 0,
                data: user[0],
                message: '查询成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                data: [],
                message: '查询失败'
            };
        }
    }
    async findOne(id) {
        try {
            const res = await this.usersRepository.findOne(id);
            return {
                code: 0,
                message: '查询成功',
                data: res,
            };
        }
        catch (error) {
            return {
                code: 0,
                message: '查询失败',
            };
        }
    }
    async findOneByUsername(username) {
        const user = await typeorm_2.getRepository(users_entity_1.User)
            .createQueryBuilder('user')
            .where("user.username = :username", { username: username })
            .getOne();
        return user;
    }
    async register(user) {
        const hasUser = await this.findOneByUsername(user.username);
        if (hasUser) {
            return {
                code: 1,
                status: 400,
                message: '用户已存在',
            };
        }
        const salt = cryptogram_1.makeSalt();
        const hashPwd = cryptogram_1.encryptPassword(user.password, salt);
        let d = new Date();
        let newUser = Object.assign(Object.assign({}, user), { stuNum: d.getTime().toString(), password: hashPwd, pwd_salt: salt });
        try {
            await this.usersRepository.insert(newUser);
            return {
                code: 0,
                message: '注册成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '注册失败'
            };
        }
    }
    async toLogin(login) {
        try {
            const findUser = await typeorm_2.getRepository(users_entity_1.User)
                .createQueryBuilder('user')
                .where("user.username = :username", { username: login.username })
                .getOne();
            if (typeof (findUser) === 'undefined') {
                return {
                    code: 1,
                    message: '用户不存在',
                    state: 'userNotFound',
                };
            }
            else {
                if (login.password === findUser.password) {
                    delete findUser.password;
                    return {
                        code: 0,
                        message: '登陆成功',
                        state: 'ok',
                        data: findUser
                    };
                }
                else {
                    return {
                        code: 1,
                        message: '用户名或密码错误',
                        state: 'passwordError'
                    };
                }
            }
        }
        catch (error) {
            return {
                code: 1,
                message: '登陆失败',
            };
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map