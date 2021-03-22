import { AppService } from './app.service';
import { SampleRequestDto } from './common/dto/sample.request.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): any;
    getHi(body: SampleRequestDto, token: any): any;
}
