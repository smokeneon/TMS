import { EssayService } from './essay.service';
import { EntityManager } from 'typeorm';
export declare class EssayController {
    private readonly applyService;
    constructor(applyService: EssayService);
    create(essay: any, manager: EntityManager): Promise<any>;
}
