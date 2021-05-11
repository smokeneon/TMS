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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const compressing_1 = require("compressing");
const nestjs_config_1 = require("nestjs-config");
let AlbumService = class AlbumService {
    constructor(configService) {
        this.configService = configService;
    }
    upload(file) {
        console.log(file);
    }
    async downloadAll() {
        const uploadDir = this.configService.get('file').root;
        const tarStream = new compressing_1.tar.Stream();
        await tarStream.addEntry(uploadDir);
        return { filename: 'hello-world.tar', tarStream };
    }
};
AlbumService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map