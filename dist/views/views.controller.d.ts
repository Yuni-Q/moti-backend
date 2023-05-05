import { Request, Response } from 'express';
import { ViewsService } from './views.service';
export declare class ViewsController {
    private viewsService;
    constructor(viewsService: ViewsService);
    static(req: Request, res: Response): void;
}
