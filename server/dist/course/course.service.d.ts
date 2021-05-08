import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { UsersService } from '../users/users.service';
export declare class CourseService {
    private courseRepository;
    private readonly usersService;
    constructor(courseRepository: Repository<Course>, usersService: UsersService);
    create(course: any, manager: any): Promise<any>;
    remove(courseId: string): Promise<object>;
    changeApprovalState(body: any, manager: any): Promise<any>;
    changeOpeningState(body: any, manager: any): Promise<any>;
    edit(id: any, course: any, manager: any): Promise<object>;
    findOne(id: string): Promise<object>;
    getList(pagination: any): Promise<any>;
    getApprovedList(pagination: any): Promise<any>;
    getNotApprovedList(pagination: any): Promise<any>;
    getCanApplyList(pagination: any): Promise<any>;
    getListByTeaId(pagination: any): Promise<any>;
    findAllWithNoPage(): Promise<any>;
    findAll(pagination: any): Promise<Object>;
}
