import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Id } from 'src/common/decorators/id.decorator';
import { ImageUploaderLiveName } from 'src/common/decorators/image.uploade.live.name.decorator';
import { RequireBodyDto } from 'src/common/dto/require.body.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { DeleteFileDto } from './dto/delete.file.dto';
import { FileDto } from './dto/file.dto';
import { FilesService } from './files.service';

@UseInterceptors(TransformInterceptor)
@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: FileDto,
    description: '성공',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        part: {
          type: 'string',
          format: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Put(':id/svg')
  async updateSvg(@ImageUploaderLiveName() body, @Id() id): Promise<FileDto> {
    const { file: cardSvgUrl, part: partString } = body;
    if (!cardSvgUrl || !partString) {
      throw new HttpException(
        new RequireBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const part = partString
      ? parseInt(partString, 10)
      : parseInt(cardSvgUrl.split('.pdf')[0].split('_').pop(), 10);
    const result = await this.filesService.update(id, { cardSvgUrl, part });
    return { data: result };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: FileDto,
    description: '성공',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        part: {
          type: 'string',
          format: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Put(':id')
  async update(@ImageUploaderLiveName() body, @Id() id): Promise<FileDto> {
    const { file: cardUrl, part: partString } = body;
    if (!cardUrl || !partString) {
      throw new HttpException(
        new RequireBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const part = partString
      ? parseInt(partString, 10)
      : parseInt(cardUrl.split('.pdf')[0].split('_').pop(), 10);
    const result = await this.filesService.update(id, { cardUrl, part });
    return { data: result };
  }

  @ApiResponse({
    status: new DeleteFileDto().status,
    type: DeleteFileDto,
    description: '성공',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Delete(':id')
  async destroy(@Id() id): Promise<DeleteFileDto> {
    const result = await this.filesService.destroy(id);
    return { data: result };
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FileDto,
    description: '성공',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        part: {
          type: 'string',
          format: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  async missions(@ImageUploaderLiveName() body): Promise<FileDto> {
    // TODO svg와 png도 함께 올리기
    const { file: cardUrl, part: partString } = body;
    if (!cardUrl || !partString) {
      throw new HttpException(
        new RequireBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const part = partString
      ? parseInt(partString, 10)
      : parseInt(cardUrl.split('.pdf')[0].split('_').pop(), 10);
    const result = await this.filesService.create({ cardUrl, part });
    return { status: HttpStatus.CREATED, data: result };
  }
}
