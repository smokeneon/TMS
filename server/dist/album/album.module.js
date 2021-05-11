"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_config_1 = require("nestjs-config");
const album_controller_1 = require("./album.controller");
const album_service_1 = require("./album.service");
let AlbumModule = class AlbumModule {
};
AlbumModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useFactory: (config) => config.get('file'),
                inject: [nestjs_config_1.ConfigService],
            }),
        ],
        controllers: [album_controller_1.AlbumController],
        providers: [album_service_1.AlbumService],
    })
], AlbumModule);
exports.AlbumModule = AlbumModule;
//# sourceMappingURL=album.module.js.map