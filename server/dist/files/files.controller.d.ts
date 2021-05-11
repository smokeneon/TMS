import { Response } from 'express';
import { FilesService } from './files.service';
import { EntityManager } from 'typeorm';
export declare class FilesController {
    private readonly albumService;
    constructor(albumService: FilesService);
    upload(body: any, file: any, manager: EntityManager): Promise<{
        code: number;
        message: string;
        error: any;
        data?: undefined;
    } | {
        code: number;
        message: string;
        error?: undefined;
        data?: undefined;
    } | {
        code: number;
        message: string;
        data: any;
        error?: undefined;
    }>;
    downloadAll(res: Response): Promise<void>;
}
