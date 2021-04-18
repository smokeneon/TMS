import { Course } from '../course/course.entity';
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
}
