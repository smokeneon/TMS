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
exports.ApplyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("../course/course.entity");
const typeorm_2 = require("typeorm");
const apply_entity_1 = require("./apply.entity");
let ApplyService = class ApplyService {
    constructor(applyRepository) {
        this.applyRepository = applyRepository;
    }
    async create(apply) {
        try {
            await this.applyRepository.insert(apply);
            return {
                code: 0,
                message: '创建成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '创建失败'
            };
        }
    }
    async remove(id) {
        try {
            const res = await this.applyRepository.delete(id);
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
    async edit(id, apply) {
        try {
            await this.applyRepository.update(id, apply);
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
        let course;
        let apply;
        try {
            if (pagination.search) {
                course = await typeorm_2.getRepository(apply_entity_1.Apply)
                    .createQueryBuilder('course')
                    .where("apply.applyNumber like :applyNumber", { applyNumber: '%' + pagination.search + '%' })
                    .skip((pagination.page - 1) * pagination.size || 0)
                    .take(pagination.size || 10)
                    .getManyAndCount();
            }
            else {
                apply = await typeorm_2.getRepository(apply_entity_1.Apply)
                    .createQueryBuilder("apply")
                    .leftJoinAndSelect("apply.course", "course")
                    .getMany();
                console.log(apply);
            }
            return {
                code: 0,
                message: '查询成功',
                data: course[0],
                total: course[1],
                page: pagination.page || 1,
                size: pagination.size || 10,
            };
        }
        catch (error) {
            console.log('error', error);
            return {
                code: 1,
                message: '查询失败',
            };
        }
    }
    async findOne(id) {
        try {
            const res = await this.applyRepository.findOne(id);
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
};
ApplyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(apply_entity_1.Apply)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ApplyService);
exports.ApplyService = ApplyService;
//# sourceMappingURL=apply.service.js.map