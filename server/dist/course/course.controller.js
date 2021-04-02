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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_service_1 = require("./course.service");
const course_entity_1 = require("./course.entity");
class PageBody {
}
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getList(pagination) {
        return await this.courseService.getList(pagination);
    }
    async create(course) {
        return await this.courseService.create(course);
    }
    async remove(courseId) {
        return await this.courseService.remove(courseId);
    }
    async update(id, body) {
        return await this.courseService.edit(id, body);
    }
    async findAll(pagination) {
        return this.courseService.findAll(pagination);
    }
    async detail(id) {
        return await this.courseService.findOne(id);
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ summary: '左连接申报表查询' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getList", null);
__decorate([
    common_1.Post('/add'),
    swagger_1.ApiOperation({ summary: '增加一门课程' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.Course]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    common_1.Delete(':courseId'),
    swagger_1.ApiOperation({ summary: '删除一门课程' }),
    __param(0, common_1.Param('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "remove", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ summary: '编辑一门课程' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, course_entity_1.Course]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查询所有课程列表' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '根据课程id查询详情' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "detail", null);
CourseController = __decorate([
    common_1.Controller('/api/v1/course'),
    swagger_1.ApiTags('课程增删改查'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map