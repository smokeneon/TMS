import { Response } from 'express';
import { FilesService } from './files.service';
import { EntityManager } from 'typeorm';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
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
    getFileList(courseId: string, manager: EntityManager): Promise<{
        code: number;
        message: string;
        data: any;
        total: any;
    } | {
        code: number;
        message: string;
        data?: undefined;
        total?: undefined;
    }>;
    downloadAll(courseId: string, res: Response): Promise<void>;
    deleteFile(fileId: string): Promise<{
        code: number;
        message: string;
        error?: undefined;
    } | {
        code: number;
        message: string;
        error: any;
    }>;
}
