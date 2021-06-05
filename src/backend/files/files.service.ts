import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/backend/common/entity/File.entity';
import { Repository } from 'typeorm';
import { InvalidFileIdException } from './exception/invalid-file-id.exception';


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) { }

  async getFileByPart(part: number) {
    return this.fileRepository
      .createQueryBuilder('files')
      .where(`part=${part}`)
      .orderBy(process.env.NODE_ENV !== 'test' ? 'RAND()' : 'RANDOM()')
      .getOne();
  }

  async deleteFile(file: File) {
    return this.fileRepository.remove(file);
  }

  async updateFile(body): Promise<File> {
    return this.fileRepository.save(body);
  }

  async create(body): Promise<File> {
    const file = await this.fileRepository.create(body as File);
    const newFile = await this.fileRepository.save(file);
    return newFile;
  }

  async checkFile({ id }: { id: number }) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new InvalidFileIdException();
    }
    return file;
  }
}
