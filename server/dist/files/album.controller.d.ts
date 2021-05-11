import { Response } from 'express';
import { AlbumService } from './album.service';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    upload(file: any): boolean;
    downloadAll(res: Response): Promise<void>;
}
