import { User } from '../users/users.entity';
export declare class Essay {
    essayId: number;
    content: string;
    userId: number;
    imgUrl: string;
    user: User[];
    timeStamp: Date;
}
