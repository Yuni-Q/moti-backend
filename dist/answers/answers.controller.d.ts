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
    date(user: any, date: any): Promise<AnswerDto>;
    week(user: any): Promise<WeekAnswerDto>;
    diary(user: any, lastIdString: any, limitString: any, directionString: any): Promise<DiaryAnswersDto>;
    list(user: any, answerId: any): Promise<ListAnswersDto>;
    listId(user: any, id: any): Promise<AnswersDto>;
    month(user: any, date: any): Promise<MonthAnswersDto>;
    get(user: any, id: any): Promise<AnswerDto>;
    post(user: any, body: any): Promise<AnswerDto>;
    put(user: any, body: any, id: any): Promise<AnswerDto>;
    delete(user: any, id: any): Promise<DeleteAnswerDto>;
}
