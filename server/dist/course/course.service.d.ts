import { Repository } from 'typeorm';
import { Course } from './course.entity';
export declare class CourseService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    create(course: Course): Promise<object>;
}
