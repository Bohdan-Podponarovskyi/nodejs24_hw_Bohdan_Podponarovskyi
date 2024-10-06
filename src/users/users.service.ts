import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UserInterface } from './interfaces/user.interface';
import { UpdateUserInputDto } from './dto/update-user-input.dto';

let users = []

@Injectable()
export class UsersService {
  findAll() {
    return users;
  }

  findOneById(id: number): UserInterface {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  findOneByEmail(email: string): UserInterface {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  findOneByEmailWithoutException(email: string): UserInterface {
    return users.find((user) => user.email === email);
  }

  findOneAndUpdate(id: number, updateUserInputDto: Partial<UpdateUserInputDto>) {
    const user = this.findOneById(id);
    return this.update(user.id, updateUserInputDto);
  }

  create(createUserInputDto: CreateUserInputDto): UserInterface {
    const newUser = {
      id: users.length + 1,
      ...createUserInputDto
    };
    users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserInputDto: Partial<UpdateUserInputDto>): UserInterface {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserInputDto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException(`Updating the ID field is not allowed`)
    }

    const updatedUser = { ...users[userIndex], ...updateUserInputDto };
    users[userIndex] = updatedUser;

    return updatedUser as UserInterface;
  }

  remove(id: number) {
    return this.findOneById(id) && users.splice(users.findIndex((user) => user.id === id), 1);
  }
}
