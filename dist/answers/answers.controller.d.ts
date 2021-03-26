import { FilesService } from 'src/files/files.service';
import { MissionsService } from 'src/missions/missions.service';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';
import { AnswersDto } from './dto/answers.dto';
import { DeleteAnswerDto } from './dto/delete.answer.dto';
import { DiaryAnswersDto } from './dto/diary.answers.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
import { WeekAnswerDto } from './dto/week.answer.dto';
export declare class AnswersController {
    private readonly answersService;
    private readonly missionsService;
    private readonly filesService;
    constructor(answersService: AnswersService, missionsService: MissionsService, filesService: FilesService);
    date(userId: any, dateString: any): Promise<AnswerDto>;
    week(userId: any): Promise<WeekAnswerDto>;
    diary(userId: any, lastIdString: any, limitString: any, directionString: any): Promise<DiaryAnswersDto>;
    list(userId: any, answerId: any): Promise<ListAnswersDto>;
    listId(userId: any, id: any): Promise<AnswersDto>;
    month(userId: any, dateString: any): Promise<MonthAnswersDto>;
    get(userId: any, id: any): Promise<AnswerDto>;
    post(userId: any, body: any): Promise<AnswerDto>;
    put(userId: any, body: any, id: any): Promise<AnswerDto>;
    delete(userId: any, id: any): Promise<DeleteAnswerDto>;
}
