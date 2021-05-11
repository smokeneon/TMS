import { ConfigService } from 'nestjs-config';
export declare class AlbumService {
    private readonly configService;
    constructor(configService: ConfigService);
    upload(file: any): void;
    downloadAll(): Promise<{
        filename: string;
        tarStream: any;
    }>;
}
