import { Essay } from './essay.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
export declare class EssayService {
    private essayRepository;
    private readonly usersService;
    constructor(essayRepository: Repository<Essay>, usersService: UsersService);
    create(essay: any, manager: any): Promise<any>;
}
