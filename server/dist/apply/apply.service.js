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
const course_service_1 = require("../course/course.service");
const users_service_1 = require("../users/users.service");
let ApplyService = class ApplyService {
    constructor(applyRepository, courseService, usersService) {
        this.applyRepository = applyRepository;
        this.courseService = courseService;
        this.usersService = usersService;
    }
    async create(apply, manager) {
        try {
            let unique = await this.applyRepository.find({
                where: [{ courseId: apply.courseId, stuId: apply.stuIds['0'] },]
            });
            if (unique.length != 0) {
                return {
                    code: 1,
                    message: '该课程你已申报，请勿重复申报'
                };
            }
        }
        catch (error) {
            return {
                code: 1,
                message: '校验唯一性发生错误'
            };
        }
        let course;
        try {
            course = await this.courseService.findOne(apply.courseId);
        }
        catch (error) {
            return {
                code: 1,
                message: '添加申报时，查询课程失败'
            };
        }
        let users = [];
        for (let i = 0; i < apply.stuIds.length; i++) {
            try {
                let user = await this.usersService.findOne(apply.stuIds[i]);
                users.push(user["data"]);
            }
            catch (error) {
                return {
                    code: 1,
                    message: '添加申报时，查询用户失败'
                };
            }
        }
        let newApply = {
            applyNumber: apply.applyNumber,
            course: course["data"],
            stu: users,
            stuId: apply.stuIds['0'],
            courseId: apply.courseId,
        };
        try {
            await manager.save(apply_entity_1.Apply, newApply);
            return {
                code: 0,
                message: '添加申报成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '添加申报失败'
            };
        }
    }
    async changeScore(body, manager) {
        try {
            let apply = await manager.find(apply_entity_1.Apply, { applyId: body.applyId });
            let score = Number(body.score);
            try {
                let updateScore;
                if (score >= 60 && score <= 100) {
                    updateScore = await manager.update(apply_entity_1.Apply, { applyId: body.applyId }, { score: score, approvalState: 1 });
                }
                if (score >= 0 && score < 60) {
                    updateScore = await manager.update(apply_entity_1.Apply, { applyId: body.applyId }, { score: score, approvalState: 2 });
                }
                if (!updateScore) {
                    throw new Error("更新 error");
                }
            }
            catch (error) {
                return {
                    code: 2,
                    message: '更新分数失败',
                    error
                };
            }
        }
        catch (error) {
            return {
                code: 1,
                message: '更新分数失败',
                error
            };
        }
        return {
            code: 0,
            message: '更新分数成功'
        };
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
    async findAllDoing(pagination) {
        let search = pagination.search || '';
        let res;
        try {
            res = await this.applyRepository.findAndCount({
                where: {
                    applyNumber: typeorm_2.Like("%" + search + "%"),
                    approvalState: 0
                },
                relations: ["course"],
                order: {
                    applyId: "DESC"
                },
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: res[0],
                total: res[1],
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
    async findAllFinished(pagination) {
        let search = pagination.search || '';
        let res;
        try {
            res = await this.applyRepository.findAndCount({
                where: {
                    applyNumber: typeorm_2.Like("%" + search + "%"),
                    approvalState: 1
                },
                relations: ["course"],
                order: {
                    applyId: "DESC"
                },
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: res[0],
                total: res[1],
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
    async findAllNotFinished(pagination) {
        let search = pagination.search || '';
        let res;
        try {
            res = await this.applyRepository.findAndCount({
                where: {
                    applyNumber: typeorm_2.Like("%" + search + "%"),
                    approvalState: 2
                },
                relations: ["course"],
                order: {
                    applyId: "DESC"
                },
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: res[0],
                total: res[1],
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
    async findAll(pagination) {
        let search = pagination.search || '';
        let res;
        try {
            res = await this.applyRepository.findAndCount({
                where: {
                    applyNumber: typeorm_2.Like("%" + search + "%"),
                },
                relations: ["course"],
                order: {
                    applyId: "DESC"
                },
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: res[0],
                total: res[1],
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
    async findMy(pagination) {
        let search = pagination.search || '';
        let res;
        try {
            res = await this.applyRepository.findAndCount({
                where: {
                    applyNumber: typeorm_2.Like("%" + search + "%"),
                    stuId: pagination.stuId,
                },
                relations: ["course"],
                order: {
                    applyId: "DESC"
                },
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
            return {
                code: 0,
                message: '查询成功',
                data: res[0],
                total: res[1],
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
    async findOne(id) {
        try {
            const res = await typeorm_2.getRepository(apply_entity_1.Apply)
                .createQueryBuilder("apply")
                .where("apply.applyNumber = :applyNumber", { applyNumber: id })
                .leftJoinAndSelect("apply.course", "course")
                .getOne();
            return {
                code: 0,
                message: '查询成功',
                data: res || {},
            };
        }
        catch (error) {
            return {
                code: 0,
                message: '查询失败',
            };
        }
    }
    async findByUserId(id) {
        try {
            const res = await typeorm_2.getRepository(apply_entity_1.Apply)
                .createQueryBuilder("apply")
                .where("apply.stuId = :stuId", { stuId: id })
                .getMany();
            return {
                code: 0,
                message: '查询成功',
                data: res || [],
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        course_service_1.CourseService,
        users_service_1.UsersService])
], ApplyService);
exports.ApplyService = ApplyService;
//# sourceMappingURL=apply.service.js.map