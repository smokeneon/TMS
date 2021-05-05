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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
const users_service_1 = require("../users/users.service");
let CourseService = class CourseService {
    constructor(courseRepository, usersService) {
        this.courseRepository = courseRepository;
        this.usersService = usersService;
    }
    async create(course, manager) {
        try {
            let user = await this.usersService.findOne(course.teaId);
            if (!user["data"]) {
                return {
                    code: 0,
                    message: '该专家不存在'
                };
            }
            let newCourse = Object.assign(Object.assign({}, course), { users: [user["data"]] });
            try {
                let saveCourse = await manager.save(course_entity_1.Course, newCourse);
                if (!saveCourse) {
                    throw new Error("insert error");
                }
            }
            catch (error) {
                return {
                    code: 1,
                    message: '添加课程失败',
                    error,
                };
            }
            return {
                code: 0,
                message: '新建课程成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '新建课程失败'
            };
        }
    }
    async remove(courseId) {
        try {
            const res = await this.courseRepository.delete(courseId);
            if (res.affected === 1) {
                return {
                    code: 0,
                    message: '删除成功'
                };
            }
        }
        catch (error) {
            if (error.errno === 1451) {
                return {
                    code: 1,
                    message: '该项目有申报表不可删除',
                    error
                };
            }
            return {
                code: 1,
                message: '删除失败',
                error
            };
        }
    }
    async changeApprovalState(body, manager) {
        try {
            const course = await manager.find(course_entity_1.Course, { courseId: body.courseId });
            let approvalState = Number(body.approvalState);
            let newCourse = Object.assign(Object.assign({}, course["0"]), { approvalState: approvalState });
            delete newCourse.users;
            try {
                let saveCourse = await manager.update(course_entity_1.Course, { courseId: body.courseId }, newCourse);
                if (!saveCourse) {
                    throw new Error("更新 error");
                }
            }
            catch (error) {
                return {
                    code: 1,
                    message: '更新课程审批状态失败',
                    error,
                };
            }
            return {
                code: 0,
                message: '更新课程审批状态成功'
            };
        }
        catch (error) {
        }
    }
    async changeOpeningState(body, manager) {
        try {
            const course = await manager.find(course_entity_1.Course, { courseId: body.courseId });
            let openState = Number(body.openState);
            let newCourse = Object.assign(Object.assign({}, course["0"]), { openState: openState });
            delete newCourse.users;
            try {
                let saveCourse = await manager.update(course_entity_1.Course, { courseId: body.courseId }, newCourse);
                if (!saveCourse) {
                    throw new Error("更新 error");
                }
            }
            catch (error) {
                return {
                    code: 1,
                    message: '更新课程审批状态失败',
                    error,
                };
            }
            return {
                code: 0,
                message: '更新课程审批状态成功'
            };
        }
        catch (error) {
        }
    }
    async edit(id, course, manager) {
        try {
            let user = await this.usersService.findOne(course.teaId);
            if (!user["data"]) {
                return {
                    code: 0,
                    message: '该专家不存在'
                };
            }
            try {
                let saveCourse = await manager.update(course_entity_1.Course, { courseId: id }, course);
                if (!saveCourse) {
                    throw new Error("insert error");
                }
            }
            catch (error) {
                return {
                    code: 1,
                    message: '编辑课程失败',
                    error,
                };
            }
            return {
                code: 0,
                message: '编辑课程成功'
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '编辑课程失败'
            };
        }
    }
    async findOne(id) {
        try {
            const res = await this.courseRepository.findOne(id);
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
    async getList(pagination) {
        let search = pagination.search || '';
        let course;
        try {
            course = await this.courseRepository.findAndCount({
                where: {
                    courseName: typeorm_2.Like("%" + search + "%"),
                },
                relations: ["users", "applys"],
                skip: (pagination.page - 1) * pagination.size || 0,
                take: pagination.size || 10,
            });
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
            return {
                code: 1,
                message: '查询失败',
                error
            };
        }
    }
    async findAllWithNoPage() {
        let course;
        try {
            course = await typeorm_2.getRepository(course_entity_1.Course)
                .createQueryBuilder('course')
                .where("course.openState = :state", { state: 1 })
                .getMany();
            return {
                code: 0,
                message: '查询成功',
                data: course
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '查询失败'
            };
        }
    }
    async findAll(pagination) {
        let search = pagination.search || '';
        let course;
        try {
            course = await typeorm_2.getRepository(course_entity_1.Course)
                .createQueryBuilder('course')
                .where("course.courseName like :courseName", { courseName: '%' + search + '%' || '%%' })
                .leftJoinAndSelect("course.applys", "applys")
                .leftJoinAndSelect("course.users", "users")
                .skip((pagination.page - 1) * pagination.size || 0)
                .take(pagination.size || 10)
                .getManyAndCount();
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
            return {
                code: 1,
                message: '查询失败',
                error
            };
        }
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map