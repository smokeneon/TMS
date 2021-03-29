import { CourseService } from './course.service';
import { Course } from './course.entity';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(course: Course): Promise<object>;
}
