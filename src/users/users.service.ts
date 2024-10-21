import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UserInterface } from './interfaces/user.interface';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { DatabaseAbstractServiceInterface } from '../database-abstract/types/database-abstract-service.interface';
import { MongooseModelsMapEnum } from '../database-abstract/types/enums/mongodb-model-map.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION') private databaseService: DatabaseAbstractServiceInterface
  ) {}

  async findAll(): Promise<UserInterface[]> {
    const users = await this.databaseService.findAll(MongooseModelsMapEnum.USER);

    if (!users || users.length == 0) {
      throw new NotFoundException('Users not found!');
    }

    return users;
  }

  async findOneById(id: string): Promise<UserInterface> {
    const user = await this.databaseService.findOneById(MongooseModelsMapEnum.USER, id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.databaseService.findOne(MongooseModelsMapEnum.USER, { email: email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findOneByEmailWithoutException(email: string): Promise<UserInterface> {
    return this.databaseService.findOne(MongooseModelsMapEnum.USER, { email: email });
  }

  async findOneAndUpdate(id: string, updateUserInputDto: Partial<UpdateUserInputDto>) {
    const existingUser = await this.databaseService.findByIdAndUpdate(MongooseModelsMapEnum.USER, id, updateUserInputDto);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existingUser;
  }

  async create(createUserInputDto: CreateUserInputDto): Promise<UserInterface> {
    return this.databaseService.insertOne(MongooseModelsMapEnum.USER, createUserInputDto);
  }

  async remove(id: string): Promise<UserInterface> {
    const user = await this.databaseService.findByIdAndDelete(MongooseModelsMapEnum.USER, id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
