import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartUserDto } from './dto/update-part-user.dto';
import { UpdateFullUserDto } from './dto/update-full-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  updateFull(id: number, updateFullUserDto: UpdateFullUserDto) {
    return `This action updates a #${id} user`;
  }

  updatePart(id: number, updatePartUserDto: UpdatePartUserDto) {
    return `This action updates a #${id} user partially`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
