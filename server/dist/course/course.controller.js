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
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("typeorm");
class PageBody {
}
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getList(pagination) {
        return await this.courseService.getList(pagination);
    }
    async getApprovedList(pagination) {
        return await this.courseService.getApprovedList(pagination);
    }
    async getNotApprovedList(pagination) {
        return await this.courseService.getNotApprovedList(pagination);
    }
    async getCanApplyList(pagination) {
        return await this.courseService.getCanApplyList(pagination);
    }
    async getMyList(pagination) {
        return await this.courseService.getListByTeaId(pagination);
    }
    async create(course, manager) {
        return await this.courseService.create(course, manager);
    }
    async remove(courseId) {
        return await this.courseService.remove(courseId);
    }
    async update(id, body, manager) {
        return await this.courseService.edit(id, body, manager);
    }
    async changeApproval(body, manager) {
        return await this.courseService.changeApprovalState(body, manager);
    }
    async changeOpening(body, manager) {
        return await this.courseService.changeOpeningState(body, manager);
    }
    async findAllWithNoPage() {
        return this.courseService.findAllWithNoPage();
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
    common_1.Get('/list/approved'),
    swagger_1.ApiOperation({ summary: '左连接申报表查询 审批过的' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getApprovedList", null);
__decorate([
    common_1.Get('/list/notApproved'),
    swagger_1.ApiOperation({ summary: '左连接申报表查询 未审批的' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getNotApprovedList", null);
__decorate([
    common_1.Get('/list/canApply'),
    swagger_1.ApiOperation({ summary: '左连接申报表查询 开放申请的' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCanApplyList", null);
__decorate([
    common_1.Get('/list/my'),
    swagger_1.ApiOperation({ summary: '左连接申报表查询 我的课程' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getMyList", null);
__decorate([
    common_1.Post('/add'),
    typeorm_1.Transaction(),
    swagger_1.ApiOperation({ summary: '增加一门课程' }),
    __param(0, common_1.Body()), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.Course, typeorm_1.EntityManager]),
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
    typeorm_1.Transaction(),
    swagger_1.ApiOperation({ summary: '编辑一门课程' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, course_entity_1.Course, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    common_1.Post('/approval'),
    typeorm_1.Transaction(),
    swagger_1.ApiOperation({ summary: '改变课程申报状态' }),
    __param(0, common_1.Body()), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "changeApproval", null);
__decorate([
    common_1.Post('/open'),
    typeorm_1.Transaction(),
    swagger_1.ApiOperation({ summary: '改变课程开放状态' }),
    __param(0, common_1.Body()), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "changeOpening", null);
__decorate([
    common_1.Get('/list/no-page'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOperation({ summary: '查询所有课程列表， 不带分页' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAllWithNoPage", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查询所有课程列表' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
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