import { SignInUserInputInterface } from '../interfaces/sign-in-user-input.interface';
import { IsEmail, IsString } from 'class-validator';

export class SignInUserInputDto implements SignInUserInputInterface {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
