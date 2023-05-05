import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class QueryNumberValidationPipe implements PipeTransform {
    private value;
    constructor(value: number);
    transform(value: any, metadata: ArgumentMetadata): number;
}
