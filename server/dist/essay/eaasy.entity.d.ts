import { User } from '../users/users.entity';
export declare class Essay {
    essayId: number;
    content: string;
    userId: number;
    stu: User[];
    timeStamp: Date;
}
