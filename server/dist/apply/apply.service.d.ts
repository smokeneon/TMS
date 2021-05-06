import { Repository } from 'typeorm';
import { Apply } from './apply.entity';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service';
export declare class ApplyService {
    private applyRepository;
    private readonly courseService;
    private readonly usersService;
    constructor(applyRepository: Repository<Apply>, courseService: CourseService, usersService: UsersService);
    create(apply: any, manager: any): Promise<any>;
    changeScore(body: any, manager: any): Promise<any>;
    remove(id: string): Promise<object>;
    edit(id: number, apply: Apply): Promise<object>;
    findAll(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
}
