import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: User): Promise<any>;
    remove(userId: string): Promise<any>;
    edit(id: number, user: User): Promise<any>;
    findAll(pagination: any): Promise<Object>;
    findAllNoPagination(): Promise<any>;
    findOne(id: string): Promise<object>;
    findOneByUsername(username: string): Promise<User>;
    register(user: User): Promise<any>;
    toLogin(login: any): Promise<any>;
}
