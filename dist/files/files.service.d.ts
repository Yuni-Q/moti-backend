import { File } from 'src/common/entity/File.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private fileRepository;
    constructor(fileRepository: Repository<File>);
    getFileByPart(part: number): Promise<File>;
    destroy(id: any): Promise<null>;
    update(id: any, body: any): Promise<File>;
    create(body: any): Promise<File>;
    checkFile(id: number): Promise<File>;
}
