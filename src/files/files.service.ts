import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/common/entity/File.entity';
import { Repository } from 'typeorm';
import { InvalidFileIdException } from './exception/invalid.file.id.exception';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async getFileByPart(part: number) {
    return this.fileRepository
      .createQueryBuilder('files')
      .where(`part=${part}`)
      .orderBy('RAND()')
      .getOne();
  }

  async destroy(file: File) {
    return this.fileRepository.remove(file);
  }

  async update(body): Promise<File> {
    const file = await this.fileRepository.save(body);
    return file;
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
