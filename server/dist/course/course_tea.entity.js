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
exports.CourseTea = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let CourseTea = class CourseTea {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    swagger_1.ApiProperty({ description: '课程专家关联表id', example: 2 }),
    __metadata("design:type", Number)
], CourseTea.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
    }),
    swagger_1.ApiProperty({ description: '专家id', example: 2 }),
    __metadata("design:type", String)
], CourseTea.prototype, "teaId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
    }),
    swagger_1.ApiProperty({ description: '课程id', example: 2 }),
    __metadata("design:type", String)
], CourseTea.prototype, "courseId", void 0);
CourseTea = __decorate([
    typeorm_1.Entity()
], CourseTea);
exports.CourseTea = CourseTea;
//# sourceMappingURL=course_tea.entity.js.map