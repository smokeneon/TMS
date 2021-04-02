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
exports.Apply = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../course/course.entity");
let Apply = class Apply {
};
__decorate([
    swagger_1.ApiProperty({ description: '申报id（自动增加生成）', example: 2 }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Apply.prototype, "applyId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '申报号 必填（前端生成）', example: '20210402001' }),
    typeorm_1.Column({
        nullable: false,
        type: String,
    }),
    __metadata("design:type", String)
], Apply.prototype, "applyNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '参训者id', example: '23' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Apply.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => course_entity_1.Course, (course) => course.applys),
    __metadata("design:type", course_entity_1.Course)
], Apply.prototype, "course", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '申报状态 默认0 0:未提交 1:审批中 2: 申报成功 3:申报失败 4:进行中 5.已完结', example: 0 }),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Apply.prototype, "approvalState", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程分数', example: '98' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Apply.prototype, "score", void 0);
Apply = __decorate([
    typeorm_1.Entity()
], Apply);
exports.Apply = Apply;
//# sourceMappingURL=apply.entity.js.map