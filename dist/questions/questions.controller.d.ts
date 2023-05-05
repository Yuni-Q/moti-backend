import { QuestionDto } from './dto/question.dto';
import { QuestionsPostRequestDto } from './dto/questions-post-request.dto';
import { QuestionsDto } from './dto/questions.dto';
import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly QuestionsService;
    constructor(QuestionsService: QuestionsService);
    post(body: QuestionsPostRequestDto): Promise<QuestionDto>;
    get(pageString: any, limitString: any): Promise<QuestionsDto>;
}
