import { Apply } from '../apply/apply.entity';
export declare class Course {
    courseId: number;
    courseName: string;
    subject: string;
    coureseBackground: string;
    courseTarget: string;
    courseFramework: string;
    teacher: string;
    userId: number;
    openState: number;
    approvalState: number;
    applys: Apply[];
}
