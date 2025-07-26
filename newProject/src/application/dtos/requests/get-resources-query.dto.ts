import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetResourcesQueryDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
