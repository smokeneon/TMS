import { Repository } from 'typeorm';
import { Apply } from './apply.entity';
export declare class ApplyService {
    private applyRepository;
    constructor(applyRepository: Repository<Apply>);
    create(apply: Apply): Promise<object>;
    remove(id: string): Promise<object>;
    edit(id: number, apply: Apply): Promise<object>;
    findAll(pagination: any): Promise<Object>;
    findOne(id: string): Promise<object>;
}
