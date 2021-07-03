import { Module } from '@nestjs/common';

import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';

@Module({
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
