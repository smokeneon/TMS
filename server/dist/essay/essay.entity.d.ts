import { User } from '../users/users.entity';
export declare class Essay {
    essayId: number;
    title: string;
    content: any;
    userId: number;
    imgUrl: string;
    isOpen: boolean;
    introduction: string;
    user: User[];
    timeStamp: Date;
}
