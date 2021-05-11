import { Apply } from '../apply/apply.entity';
import { User } from '../users/users.entity';
import { Files } from '../files/files.entity';
export declare class Course {
    courseId: number;
    courseName: string;
    subject: string;
    coureseBackground: string;
    courseTarget: string;
    courseFramework: string;
    teaId: number;
    openState: number;
    approvalState: number;
    startDate: string;
    endDate: string;
    address: string;
    applys: Apply[];
    users: User[];
    timeStamp: Date;
    files: Files[];
}
