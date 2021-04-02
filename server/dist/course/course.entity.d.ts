import { Apply } from '../apply/apply.entity';
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
}
