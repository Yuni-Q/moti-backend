import { DeleteFileDto } from './dto/delete-file.dto';
import { FileBodyDto } from './dto/file-body.dto';
import { FileDto } from './dto/file.dto';
import { FilesDto } from './dto/files.dto';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    getAllFiles(): Promise<FilesDto>;
    createFile(body: FileBodyDto): Promise<FileDto>;
    updateSvg(body: FileBodyDto, id: number): Promise<FileDto>;
    updatePdf(body: FileBodyDto, id: number): Promise<FileDto>;
    destroy(id: number): Promise<DeleteFileDto>;
}
