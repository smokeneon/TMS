import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service';
import { Files } from './files.entity';
export declare class FilesService {
    private filesRepository;
    private readonly configService;
    private readonly courseService;
    private readonly usersService;
    constructor(filesRepository: Repository<Files>, configService: ConfigService, courseService: CourseService, usersService: UsersService);
    upload(body: any, file: any, manager: any): Promise<{
        code: number;
        message: string;
        error: any;
        data?: undefined;
    } | {
        code: number;
        message: string;
        error?: undefined;
        data?: undefined;
    } | {
        code: number;
        message: string;
        data: any;
        error?: undefined;
    }>;
    downloadAll(): Promise<{
        filename: string;
        tarStream: tar.Stream;
    }>;
}
