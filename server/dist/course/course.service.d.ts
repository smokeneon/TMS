import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { UsersService } from '../users/users.service';
export declare class CourseService {
    private courseRepository;
    private readonly usersService;
    constructor(courseRepository: Repository<Course>, usersService: UsersService);
    hotCourses(manager: any): Promise<any>;
    create(course: any, manager: any): Promise<any>;
    remove(courseId: string): Promise<object>;
    changeApprovalState(body: any, manager: any): Promise<any>;
    changeOpeningState(body: any, manager: any): Promise<any>;
    edit(id: any, course: any, manager: any): Promise<object>;
    findOne(id: string): Promise<object>;
    getDetails(id: any): Promise<any>;
    getList(pagination: any): Promise<any>;
    getApprovedList(pagination: any): Promise<any>;
    getNotApprovedList(pagination: any): Promise<any>;
    getCanApplyList(pagination: any): Promise<any>;
    getListByTeaId(pagination: any): Promise<any>;
    findAllWithNoPage(): Promise<any>;
    getPie(manager: any): Promise<any>;
    findAll(pagination: any): Promise<Object>;
}
