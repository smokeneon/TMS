import { CourseService } from './course.service';
import { Course } from './course.entity';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(course: Course): Promise<object>;
    remove(id: string): Promise<object>;
    update(id: number, body: Course): Promise<object>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
}
