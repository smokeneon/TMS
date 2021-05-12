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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const compressing_1 = require("compressing");
const nestjs_config_1 = require("nestjs-config");
const typeorm_2 = require("typeorm");
const course_service_1 = require("../course/course.service");
const users_service_1 = require("../users/users.service");
const files_entity_1 = require("./files.entity");
let FilesService = class FilesService {
    constructor(filesRepository, configService, courseService, usersService) {
        this.filesRepository = filesRepository;
        this.configService = configService;
        this.courseService = courseService;
        this.usersService = usersService;
    }
    async upload(body, file, manager) {
        let user;
        let course;
        try {
            user = await this.usersService.findOne(body.userId);
        }
        catch (error) {
            return {
                code: 1,
                message: '添加文件时，用户查询失败',
                error
            };
        }
        try {
            course = await this.courseService.findOne(body.courseId);
        }
        catch (error) {
            return {
                code: 1,
                message: '添加文件时，查询课程失败'
            };
        }
        let newFile = {
            path: file.path.split('dist')["1"],
            userId: body.userId,
            courseId: body.courseId,
            users: user.data,
            courses: course.data,
        };
        try {
            let data = await manager.save(files_entity_1.Files, newFile);
            return {
                code: 0,
                message: '添加文件成功',
                data
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '添加申报失败',
                error
            };
        }
    }
    async getList(courseId, manager) {
        let files;
        try {
            files = await this.filesRepository.findAndCount({
                where: {
                    courseId: courseId,
                },
                relations: ["courses", "users"],
            });
            return {
                code: 0,
                message: '文件列表查询成功',
                data: files["0"],
                total: files["1"],
            };
        }
        catch (error) {
            return {
                code: 1,
                message: '文件列表查询失败'
            };
        }
    }
    async downloadAll(courseId) {
        const uploadDir = this.configService.get('file').root + '/' + courseId;
        const tarStream = new compressing_1.tar.Stream();
        await tarStream.addEntry(uploadDir);
        return { filename: 'tms.tar', tarStream };
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(files_entity_1.Files)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_config_1.ConfigService,
        course_service_1.CourseService,
        users_service_1.UsersService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map