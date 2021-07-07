import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewsService } from './views.service';

@Controller('/')
export class ViewsController {
  constructor(private viewsService: ViewsService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const app = this.viewsService.getNextServer();

    // app.serveStatic(req, res, join(__dirname, '..', 'static'));
    // const parsedUrl = parse(req.url as string, true);

    const handle = app.getRequestHandler();
    handle(req, res);
  }
}
