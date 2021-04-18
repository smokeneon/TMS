import { Apply } from '../apply/apply.entity';
import { User } from '../users/users.entity';
export declare class Course {
    courseId: number;
    courseName: string;
    subject: string;
    coureseBackground: string;
    courseTarget: string;
    courseFramework: string;
    openState: number;
    approvalState: number;
    applys: Apply[];
    users: User[];
}
