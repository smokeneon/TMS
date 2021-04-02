import { ApplyService } from './apply.service';
import { Apply } from './apply.entity';
export declare class ApplyController {
    private readonly applyService;
    constructor(applyService: ApplyService);
    create(apply: any): Promise<object>;
    remove(id: string): Promise<object>;
    update(id: number, body: Apply): Promise<object>;
    findAll(pagination: string): Promise<Object>;
    detail(id: string): Promise<object>;
}
