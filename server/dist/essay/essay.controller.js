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
    constructor(applyService) {
        this.applyService = applyService;
    }
    async create(essay, manager) {
        console.log('essady', essay);
        return await this.applyService.create(essay, manager);
    }
};
__decorate([
    common_1.Post('/add'),
    swagger_1.ApiOperation({ summary: '添加一个申报' }),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "create", null);
EssayController = __decorate([
    common_1.Controller('/api/v1/essay'),
    swagger_1.ApiTags('笔记增删改查'),
    __metadata("design:paramtypes", [essay_service_1.EssayService])
], EssayController);
exports.EssayController = EssayController;
//# sourceMappingURL=essay.controller.js.map