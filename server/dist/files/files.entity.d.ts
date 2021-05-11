import { User } from '../users/users.entity';
import { Course } from '../course/course.entity';
export declare class Files {
    fileId: number;
    path: string;
    userId: number;
    courseId: number;
    createTime: any;
    updateTime: any;
    users: User[];
    courses: Course[];
}
