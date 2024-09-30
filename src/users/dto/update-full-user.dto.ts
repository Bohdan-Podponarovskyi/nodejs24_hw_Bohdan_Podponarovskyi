import { IUser } from '../interfaces/user.interface';
import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

export class UpdateFullUserDto implements IUser {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @Min(18, { message: 'Age must be at least 18' })
  age: number;

  @IsBoolean()
  isStudent: boolean;
}
