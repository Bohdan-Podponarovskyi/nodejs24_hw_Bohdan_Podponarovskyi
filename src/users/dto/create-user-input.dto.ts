import { IsBoolean, IsEmail, IsNumber, IsString, Min } from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user-input.interface';

export class CreateUserInputDto implements ICreateUserInput {
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
  email: string;

  @IsString()
  password: string;
}
