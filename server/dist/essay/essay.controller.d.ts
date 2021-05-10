import { EssayService } from './essay.service';
import { EntityManager } from 'typeorm';
export declare class EssayController {
    private readonly essayService;
    constructor(essayService: EssayService);
    create(essay: any, manager: EntityManager): Promise<any>;
    findByUserId(userId: string, manager: EntityManager): Promise<any>;
    findByEssayId(essayId: string, manager: EntityManager): Promise<any>;
    remove(id: string): Promise<object>;
}
