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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async upload(body, file, manager) {
        return await this.filesService.upload(body, file, manager);
    }
    async getFileList(courseId, manager) {
        return await this.filesService.getList(courseId, manager);
    }
    async downloadAll(courseId, res) {
        const { filename, tarStream } = await this.filesService.downloadAll(courseId);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        tarStream.pipe(res);
    }
    async deleteFile(fileId) {
        return await this.filesService.deleteFile(fileId);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: '上传文件' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "upload", null);
__decorate([
    common_1.Get('/list/:courseId'),
    swagger_1.ApiOperation({ summary: '下载文件列表' }),
    typeorm_1.Transaction(),
    __param(0, common_1.Param('courseId')), __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFileList", null);
__decorate([
    common_1.Get('/export/:courseId'),
    swagger_1.ApiOperation({ summary: '下载所有文件' }),
    __param(0, common_1.Param('courseId')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "downloadAll", null);
__decorate([
    common_1.Delete(':fileId'),
    swagger_1.ApiOperation({ summary: '根据文件id删除文件' }),
    __param(0, common_1.Param('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteFile", null);
FilesController = __decorate([
    common_1.Controller('/api/v1/files'),
    swagger_1.ApiTags('文件上传下载'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map