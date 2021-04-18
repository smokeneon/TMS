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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const apply_entity_1 = require("../apply/apply.entity");
const users_entity_1 = require("../users/users.entity");
let Course = class Course {
};
__decorate([
    swagger_1.ApiProperty({ description: '课程id（前台生成）', example: 2 }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Course.prototype, "courseId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程名 必填', example: '物理学概况' }),
    typeorm_1.Column({
        nullable: false,
        type: String,
    }),
    __metadata("design:type", String)
], Course.prototype, "courseName", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '所属学科', example: '物理学' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Course.prototype, "subject", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程背景', example: '是一门历史悠久的学科' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Course.prototype, "coureseBackground", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程目标', example: '把你打造成改变世界的物理学者' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Course.prototype, "courseTarget", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程架构', example: '一周理论，一周实操' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Course.prototype, "courseFramework", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '开课状态 默认0 0:未开课，1:进行中，2:已完结', example: 0 }),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "openState", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '审批状态状态 默认0 0:未提交 1:审批中 2: 审批成功 3:审批失败', example: 0 }),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "approvalState", void 0);
__decorate([
    typeorm_1.OneToMany(() => apply_entity_1.Apply, (apply) => apply.course),
    __metadata("design:type", Array)
], Course.prototype, "applys", void 0);
__decorate([
    typeorm_1.ManyToMany(() => users_entity_1.User),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Course.prototype, "users", void 0);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;
//# sourceMappingURL=course.entity.js.map