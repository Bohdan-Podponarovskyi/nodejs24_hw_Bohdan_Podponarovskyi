import { IsString } from 'class-validator';
import { SignUpUserResponseInterface } from '../interfaces/sign-up-user-response.interface';

export class SignUpUserResponseDto implements SignUpUserResponseInterface {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
