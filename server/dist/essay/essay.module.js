"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const essay_controller_1 = require("./essay.controller");
const essay_service_1 = require("./essay.service");
const essay_entity_1 = require("./essay.entity");
const users_module_1 = require("../users/users.module");
let EssayModule = class EssayModule {
};
EssayModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([essay_entity_1.Essay]), users_module_1.UsersModule],
        controllers: [essay_controller_1.EssayController],
        providers: [essay_service_1.EssayService],
        exports: [essay_service_1.EssayService],
    })
], EssayModule);
exports.EssayModule = EssayModule;
//# sourceMappingURL=essay.module.js.map