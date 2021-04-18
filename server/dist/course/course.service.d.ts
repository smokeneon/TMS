import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { UsersService } from '../users/users.service';
export declare class CourseService {
    private courseRepository;
    private readonly usersService;
    constructor(courseRepository: Repository<Course>, usersService: UsersService);
    create(course: any, manager: any): Promise<any>;
    remove(courseId: string): Promise<object>;
    edit(id: number, course: Course): Promise<object>;
    findAll(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
    getList(pagination: any): Promise<any>;
}
