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
let CourseService = class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async create(course) {
        if (course.courseName === undefined) {
            return {
                code: 1,
                message: '缺少课程名或者所属教师id字段'
            };
        }
        try {
            await this.courseRepository.insert(course);
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
            return {
                code: 1,
                message: '删除失败'
            };
        }
    }
    async edit(id, course) {
        try {
            await this.courseRepository.update(id, course);
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
        try {
            if (pagination.search) {
                course = await typeorm_2.getRepository(course_entity_1.Course)
                    .createQueryBuilder('course')
                    .where("course.courseName like :courseName", { courseName: '%' + pagination.search + '%' })
                    .skip((pagination.page - 1) * pagination.size || 0)
                    .take(pagination.size || 10)
                    .getManyAndCount();
            }
            else {
                course = await typeorm_2.getRepository(course_entity_1.Course)
                    .createQueryBuilder('course')
                    .skip((pagination.page - 1) * pagination.size || 0)
                    .take(pagination.size || 10)
                    .getManyAndCount();
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
            return {
                code: 1,
                message: '查询失败'
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
    async getList() {
        try {
            console.log('zdddd');
            const res = await this.courseRepository
                .createQueryBuilder('course')
                .getMany();
            console.log('走到这里了');
            console.log('res', res);
            return {
                code: 0,
                okkk: 'ccc',
            };
        }
        catch (error) {
        }
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map