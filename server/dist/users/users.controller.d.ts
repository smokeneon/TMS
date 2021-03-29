import { UsersService } from './users.service';
import { User } from './users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(user: User): Promise<void>;
    remove(id: string): Promise<void>;
    update(id: number, body: User): Promise<boolean>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<User>;
}
