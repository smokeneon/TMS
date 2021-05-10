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
exports.Essay = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let Essay = class Essay {
};
__decorate([
    swagger_1.ApiProperty({ description: '文章id（自动增加生成）', example: 2 }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Essay.prototype, "essayId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '文章标题', example: '文章标题' }),
    typeorm_1.Column({
        nullable: true,
        type: String,
    }),
    __metadata("design:type", String)
], Essay.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '文章内容', example: '新建笔记' }),
    typeorm_1.Column({
        nullable: true,
        type: "text",
    }),
    __metadata("design:type", Object)
], Essay.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '用户id', example: '15' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Essay.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '图片地址', example: 'http://pic.com' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Essay.prototype, "imgUrl", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '是否开放', example: '默认 false' }),
    typeorm_1.Column({
        nullable: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], Essay.prototype, "isOpen", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '简介', example: '一段30个字之内的话' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Essay.prototype, "introduction", void 0);
__decorate([
    typeorm_1.ManyToMany(() => users_entity_1.User, (user) => user.applys, {
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Essay.prototype, "user", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '更新时间', example: '2021-05-21' }),
    typeorm_1.Column({
        nullable: true,
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Essay.prototype, "timeStamp", void 0);
Essay = __decorate([
    typeorm_1.Entity()
], Essay);
exports.Essay = Essay;
//# sourceMappingURL=essay.entity.js.map