import { Course } from '../course/course.entity';
import { User } from '../users/users.entity';
export declare class Apply {
    applyId: number;
    applyNumber: string;
    stuId: number;
    courseId: number;
    course: Course;
    stu: User[];
    approvalState: number;
    score: number;
    timeStamp: Date;
}
