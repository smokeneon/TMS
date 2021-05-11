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
exports.Files = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const course_entity_1 = require("../course/course.entity");
let Files = class Files {
};
__decorate([
    swagger_1.ApiProperty({ description: '文件id（自动增加生成）', example: 2 }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Files.prototype, "fileId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '文件路径', example: '/dist/2021/05/11/xxx.png' }),
    typeorm_1.Column({
        nullable: true,
        type: String,
    }),
    __metadata("design:type", String)
], Files.prototype, "path", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '上传者id', example: '15' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Files.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '课程id', example: '16' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Files.prototype, "courseId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '创建时间 自动生成', example: '...' }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Files.prototype, "createTime", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '更新时间 自动生成', example: '...' }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Files.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.ManyToMany(() => users_entity_1.User, (user) => user.files, {
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Files.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToMany(() => course_entity_1.Course, (course) => course.files, {
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Files.prototype, "courses", void 0);
Files = __decorate([
    typeorm_1.Entity()
], Files);
exports.Files = Files;
//# sourceMappingURL=files.entity.js.map