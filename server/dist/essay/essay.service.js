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
exports.EssayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const essay_entity_1 = require("./essay.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
let EssayService = class EssayService {
    constructor(essayRepository, usersService) {
        this.essayRepository = essayRepository;
        this.usersService = usersService;
    }
    async create(essay, manager) {
        const getString = (s, n) => {
            if (s.length < n) {
                s = delHtmlTag(s);
            }
            if (s.length > n) {
                return s.substring(0, n);
            }
            return s;
        };
        const delHtmlTag = (str) => {
            return str.replace(/<[^>]+>/g, "");
        };
        let intro = getString(essay.content, 30);
        let getUser;
        if (essay.firstEssay === 'yes') {
            try {
                getUser = await this.usersService.findOne(essay.userId);
                let newEssay = Object.assign(Object.assign({}, essay), { user: [getUser.data], introduction: intro });
                try {
                    let addedEssay = await manager.save(essay_entity_1.Essay, newEssay);
                    return {
                        code: 0,
                        message: '笔记新增成功',
                        data: {
                            essayId: addedEssay.essayId
                        }
                    };
                }
                catch (error) {
                    return {
                        code: 1,
                        message: '笔记插入失败',
                        error
                    };
                }
            }
            catch (error) {
                return {
                    code: 1,
                    message: '用户查询失败',
                    error
                };
            }
        }
        if (essay.firstEssay === 'no') {
            try {
                await manager.update(essay_entity_1.Essay, { essayId: essay.essayId }, { content: essay.content, title: essay.title, introduction: intro });
                return {
                    code: 0,
                    message: '笔记保存成功',
                    data: {
                        essayId: essay.essayId
                    }
                };
            }
            catch (error) {
                return {
                    code: 1,
                    message: '笔记更新失败',
                    error
                };
            }
        }
    }
    async findByUserId(userId, manager) {
        let res;
        try {
            res = await this.essayRepository.findAndCount({
                where: {
                    userId: userId,
                }
            });
            let _new_arr_ = res["0"].map((item) => {
                return Object.keys(item).reduce((obj, key) => {
                    if (key === 'content')
                        return obj;
                    obj[key] = item[key];
                    return obj;
                }, {});
            });
            return {
                code: 0,
                message: '查询笔记列表成功',
                data: _new_arr_
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '查询笔记列表失败'
            };
        }
    }
    async detail(essayId, manager) {
        let res;
        try {
            res = await this.essayRepository.findOne({
                where: {
                    essayId: essayId,
                }
            });
            return {
                code: 0,
                message: '获取课程详情成功',
                data: res,
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '获取课程详情失败',
                error
            };
        }
    }
    async remove(id) {
        try {
            const res = await this.essayRepository.delete(id);
            if (res.affected === 1) {
                return {
                    code: 0,
                    message: '删除成功'
                };
            }
        }
        catch (error) {
            return {
                code: 1,
                message: '删除失败'
            };
        }
    }
};
EssayService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(essay_entity_1.Essay)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], EssayService);
exports.EssayService = EssayService;
//# sourceMappingURL=essay.service.js.map