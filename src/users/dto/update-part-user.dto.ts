import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdatePartUserDto extends PartialType(CreateUserDto) {}
