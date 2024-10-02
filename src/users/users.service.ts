import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdatePartUserInputDto } from './dto/update-part-user-input.dto';
import { UpdateFullUserInputDto } from './dto/update-full-user-input.dto';

@Injectable()
export class UsersService {
  create(createUserInputDto: CreateUserInputDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  updateFull(id: number, updateFullUserInputDto: UpdateFullUserInputDto) {
    return `This action updates a #${id} user`;
  }

  updatePart(id: number, updatePartUserInputDto: UpdatePartUserInputDto) {
    return `This action updates a #${id} user partially`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
