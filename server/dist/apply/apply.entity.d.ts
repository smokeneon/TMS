import { Course } from '../course/course.entity';
export declare class Apply {
    applyId: number;
    applyNumber: string;
    userId: string;
    course: Course;
    approvalState: number;
    applicantId: number;
}
