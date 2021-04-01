import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: User): Promise<any>;
    remove(id: string): Promise<void>;
    edit(id: number, user: User): Promise<boolean>;
    findAll(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
    findOneByUsername(username: string): Promise<User>;
}
