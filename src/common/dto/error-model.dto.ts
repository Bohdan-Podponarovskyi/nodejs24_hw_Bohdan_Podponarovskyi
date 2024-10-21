import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

class MessageKeyErrorDto {
  @ApiProperty()
  @IsString()
  messageKey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  property: string;
}

export class ErrorModelDto {
  @ApiProperty({ type: MessageKeyErrorDto, isArray: true })
  errors: MessageKeyErrorDto[];

  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsDate()
  timestamp: Date;

  @ApiProperty()
  @IsString()
  path: string;
}