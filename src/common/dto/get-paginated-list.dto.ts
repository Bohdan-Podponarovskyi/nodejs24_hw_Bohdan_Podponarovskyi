import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetPaginatedListDto {
  @IsOptional()
  @Transform(param => parseInt(param.value))
  @IsNumber()
  @ApiProperty({ default: 0 })
  skip = 0;

  @IsOptional()
  @Transform(param => parseInt(param.value))
  @IsNumber()
  @Min(1)
  @Max(50)
  @ApiPropertyOptional({ default: 20, maximum: 50 })
  take = 20;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetPaginatedListWithParamsDto<T extends GetPaginatedListDto>  {
  @IsOptional()
  @ApiProperty()
  parameters: T;
}