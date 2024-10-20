import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

class MessageKeyErrorInterface {
  @ApiProperty()
  @IsString()
  messageKey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  property: string;
}

export class ErrorModelDto {
  @ApiProperty({ type: MessageKeyErrorInterface, isArray: true })
  errors: MessageKeyErrorInterface[];

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