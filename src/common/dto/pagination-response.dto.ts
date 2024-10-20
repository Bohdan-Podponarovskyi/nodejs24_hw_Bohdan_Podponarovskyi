import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationResponseDto<T> {
  @ApiProperty({ type: <T>[] })
  data: T[];

  @ApiProperty()
  @IsNumber()
  skip: number;

  @ApiProperty()
  @IsNumber()
  total: number;
}