import { CourseService } from './course.service';
import { Course } from './course.entity';
import { EntityManager } from 'typeorm';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getList(pagination: string): Promise<any>;
    create(course: Course, manager: EntityManager): Promise<any>;
    remove(courseId: string): Promise<object>;
    update(id: number, body: Course, manager: EntityManager): Promise<object>;
    findAllWithNoPage(): Promise<any>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
}
