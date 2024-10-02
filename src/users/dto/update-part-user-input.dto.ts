import { IUpdatePartUserInput } from '../interfaces/update-part-user-input.interface';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePartUserInputDto implements IUpdatePartUserInput {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @Min(18, { message: 'Age must be at least 18' })
  @IsOptional()
  age: number;

  @IsBoolean()
  @IsOptional()
  isStudent: boolean;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}