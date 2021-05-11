import { Course } from '../course/course.entity';
import { Apply } from '../apply/apply.entity';
import { Files } from '../files/files.entity';
export declare class User {
    userId: number;
    username: string;
    realname: string;
    password: string;
    pwd_salt: string;
    stuNum: string;
    identity: string;
    email: string;
    courses: Course[];
    applys: Apply[];
    files: Files[];
    timeStamp: Date;
}
