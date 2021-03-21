import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { File } from 'src/common/entity/File.entity';
import { Repository } from 'typeorm';
import { InvalidFileIdDto } from './dto/invalid.file.id.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}
  async update(id, body): Promise<File> {
    try {
      const file = await this.checkFile(id);
      const newFile = { ...file, ...body };
      const returnFile = await this.fileRepository.save(newFile);
      return returnFile;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async create(body): Promise<File> {
    try {
      const file = await this.fileRepository.create(body as File);
      const newFile = await this.fileRepository.save(file);
      return newFile;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkFile(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new HttpException(
        new InvalidFileIdDto(),
        new InvalidFileIdDto().status,
      );
    }
    return file;
  }
}
