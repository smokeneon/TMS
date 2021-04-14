import { UsersService } from './users.service';
import { User } from './users.entity';
declare class LoginDto {
    username: String;
    password: String;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<any>;
    create(user: User): Promise<any>;
    remove(id: string): Promise<any>;
    update(id: number, body: User): Promise<any>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
    findOneByUsername(username: string): Promise<{
        code: number;
        message: string;
    }>;
}
export {};
