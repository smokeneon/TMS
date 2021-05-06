import { ApplyService } from './apply.service';
import { Apply } from './apply.entity';
import { EntityManager } from 'typeorm';
export declare class ApplyController {
    private readonly applyService;
    constructor(applyService: ApplyService);
    create(apply: any, manager: EntityManager): Promise<any>;
    remove(id: string): Promise<object>;
    update(id: number, body: Apply): Promise<object>;
    changeScoreRequest(body: any, manager: EntityManager): Promise<any>;
    findAll(pagination: string): Promise<Object>;
    findAllDoing(pagination: string): Promise<Object>;
    findAllFinished(pagination: string): Promise<Object>;
    findAllNotFinished(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
}
