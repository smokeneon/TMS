import { Repository } from 'typeorm';
import { Course } from './course.entity';
export declare class CourseService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    create(course: Course): Promise<object>;
    remove(id: string): Promise<object>;
    edit(id: number, course: Course): Promise<object>;
    findAll(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
}
