import { ApplyService } from './apply.service';
import { Apply } from './apply.entity';
import { EntityManager } from 'typeorm';
export declare class ApplyController {
    private readonly applyService;
    constructor(applyService: ApplyService);
    create(apply: any, manager: EntityManager): Promise<any>;
    remove(id: string): Promise<object>;
    update(id: number, body: Apply): Promise<object>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
}
