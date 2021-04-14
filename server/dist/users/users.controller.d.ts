import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './users.entity';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(loginParmas: any): Promise<{
        code: number;
        data: {
            token: string;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    } | {
        code: number;
        message: string;
    }>;
    create(user: User): Promise<any>;
    remove(id: string): Promise<any>;
    update(id: number, body: User): Promise<any>;
    findAll(pagination: string): Promise<Object>;
    x: any;
    detail(id: string): Promise<object>;
    findOneByUsername(username: string): Promise<User | {
        code: number;
        message: string;
    }>;
    register(user: User): Promise<any>;
}
