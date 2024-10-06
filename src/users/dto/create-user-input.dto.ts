import { IsBoolean, IsEmail, IsNumber, IsString, Min } from 'class-validator';
import { CreateUserInputInterface } from '../interfaces/create-user-input.interface';

export class CreateUserInputDto implements CreateUserInputInterface {
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
