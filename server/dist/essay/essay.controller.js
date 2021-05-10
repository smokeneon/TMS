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
exports.EssayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const essay_service_1 = require("./essay.service");
const typeorm_1 = require("typeorm");
let EssayController = class EssayController {
    constructor(essayService) {
        this.essayService = essayService;
    }
    async create(essay, manager) {
        return await this.essayService.create(essay, manager);
    }
    async findByUserId(userId, manager) {
        return await this.essayService.findByUserId(userId, manager);
    }
    async findByEssayId(essayId, manager) {
        return await this.essayService.detail(essayId, manager);
    }
    async remove(id) {
        return await this.essayService.remove(id);
    }
};
__decorate([
    common_1.Post('/add'),
    swagger_1.ApiOperation({ summary: '添加一个笔记' }),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "create", null);
__decorate([
    common_1.Get('/findByUser/:userId'),
    swagger_1.ApiOperation({ summary: '根据用户id查询笔记列表' }),
    typeorm_1.Transaction(),
    __param(0, common_1.Param('userId')), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "findByUserId", null);
__decorate([
    common_1.Get(':essayId'),
    swagger_1.ApiOperation({ summary: '根据笔记id查详情' }),
    typeorm_1.Transaction(),
    __param(0, common_1.Param('essayId')), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "findByEssayId", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: '删除一个笔记' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "remove", null);
EssayController = __decorate([
    common_1.Controller('/api/v1/essay'),
    swagger_1.ApiTags('笔记增删改查'),
    __metadata("design:paramtypes", [essay_service_1.EssayService])
], EssayController);
exports.EssayController = EssayController;
//# sourceMappingURL=essay.controller.js.map