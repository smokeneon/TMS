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
exports.ApplyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const apply_service_1 = require("./apply.service");
const apply_entity_1 = require("./apply.entity");
let ApplyController = class ApplyController {
    constructor(applyService) {
        this.applyService = applyService;
    }
    async create(apply) {
        console.log('apply', apply);
        return await this.applyService.create(apply);
    }
    async remove(id) {
        return await this.applyService.remove(id);
    }
    async update(id, body) {
        return await this.applyService.edit(id, body);
    }
    async findAll(pagination) {
        return this.applyService.findAll(pagination);
    }
    async detail(id) {
        return await this.applyService.findOne(id);
    }
};
__decorate([
    common_1.Post('/add'),
    swagger_1.ApiOperation({ summary: '添加一个申报' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: '删除一个申报' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "remove", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ summary: '编辑一个申报' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_entity_1.Apply]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "update", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查询所有申报列表' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '根据申报id查询申报详情' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "detail", null);
ApplyController = __decorate([
    common_1.Controller('/api/v1/apply'),
    swagger_1.ApiTags('申报增删改查'),
    __metadata("design:paramtypes", [apply_service_1.ApplyService])
], ApplyController);
exports.ApplyController = ApplyController;
//# sourceMappingURL=apply.controller.js.map