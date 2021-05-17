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
    findAllDoing(pagination: any): Promise<Object>;
    findAllFinished(pagination: any): Promise<Object>;
    findAllNotFinished(pagination: any): Promise<Object>;
    findAll(pagination: any): Promise<Object>;
    getHistogramData(manager: any): Promise<any>;
    findMy(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
    findByUserId(id: string): Promise<object>;
}
