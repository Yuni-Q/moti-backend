import { Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitFormData } from 'src/common/decorators/api-implicit-form-data.decorator';
import { ImageUploaderLiveName } from 'src/common/decorators/image.uploade.live.name.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { FileDto } from './dto/file.dto';
import { FilesService } from './files.service';

@UseInterceptors(TransformInterceptor)
@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiResponse({
    status: new FileDto().status,
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
    console.log(123, cardUrl, partString);
    const part = partString
      ? parseInt(partString, 10)
      : parseInt(cardUrl.split('.pdf')[0].split('_').pop(), 10);
    const result = await this.filesService.create({ cardUrl, part });
    return { status: HttpStatus.CREATED, data: result };
  }
}
