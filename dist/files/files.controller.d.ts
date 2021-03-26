import { DeleteFileDto } from './dto/delete.file.dto';
import { FileDto } from './dto/file.dto';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    updateSvg(body: any, id: any): Promise<FileDto>;
    updatePdf(body: any, id: any): Promise<FileDto>;
    destroy(id: any): Promise<DeleteFileDto>;
    createFile(body: any): Promise<FileDto>;
}
