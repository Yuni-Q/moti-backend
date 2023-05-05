import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Mission } from 'src/backend/common/entity/Mission.entity';
declare class Missions {
    refresh: boolean;
    missions: Mission[];
}
export declare class MissionsDto extends ResponseDto {
    data: Missions;
}
export {};
