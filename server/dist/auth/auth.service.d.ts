import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    validateUser(username: string, pass: string): Promise<any>;
}
