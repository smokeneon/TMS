"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_controller_1 = require("./course.controller");
const course_service_1 = require("./course.service");
const course_entity_1 = require("./course.entity");
const users_module_1 = require("../users/users.module");
const email_module_1 = require("../email/email.module");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course]), users_module_1.UsersModule, email_module_1.EmailModule],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map