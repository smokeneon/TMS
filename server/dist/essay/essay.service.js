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
        let getUser;
        console.log('essay', essay);
        if (essay.firstEssay === 'yes') {
            try {
                getUser = await this.usersService.findOne(essay.userId);
                let newEssay = Object.assign(Object.assign({}, essay), { user: [getUser.data] });
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
                await manager.update(essay_entity_1.Essay, { essayId: essay.essayId }, { content: essay.content, });
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
};
EssayService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(essay_entity_1.Essay)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], EssayService);
exports.EssayService = EssayService;
//# sourceMappingURL=essay.service.js.map