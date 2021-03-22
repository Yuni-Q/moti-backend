import { ResponseDto } from 'src/common/dto/response.dto';
import { Mission } from 'src/common/entity/Mission.entity';
export declare class MissionsDto extends ResponseDto {
    data: {
        refresh: boolean;
        missions: Mission[];
    };
}
