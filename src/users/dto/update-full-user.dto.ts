import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { IUpdateFullUserInput } from '../interfaces/update-full-user-input.interface';

export class UpdateFullUserDto implements IUpdateFullUserInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @Min(18, { message: 'Age must be at least 18' })
  age: number;

  @IsBoolean()
  isStudent: boolean;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
