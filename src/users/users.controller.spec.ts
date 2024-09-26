import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartUserDto } from './dto/update-part-user.dto';
import { UpdateFullUserDto } from './dto/update-full-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create and return a success message', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        isStudent: false,
      };
      jest.spyOn(service, 'create').mockReturnValue('This action adds a new user');

      expect(controller.create(createUserDto)).toEqual('This action adds a new user');
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll and return a list of users', () => {
      jest.spyOn(service, 'findAll').mockReturnValue('This action returns all users');

      expect(controller.findAll()).toEqual('This action returns all users');
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with the correct ID and return a specific user message', () => {
      const userId = 1;
      jest.spyOn(service, 'findOne').mockReturnValue(`This action returns a #${userId} user`);

      expect(controller.findOne(userId.toString())).toEqual(`This action returns a #${userId} user`);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateFull', () => {
    it('should call usersService.updateFull and return a success message', () => {
      const userId = 1;
      const updateFullUserDto: UpdateFullUserDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 30,
        isStudent: true,
      };
      jest.spyOn(service, 'updateFull').mockReturnValue(`This action updates a #${userId} user`);

      expect(controller.updateFull(userId.toString(), updateFullUserDto)).toEqual(`This action updates a #${userId} user`);
      expect(service.updateFull).toHaveBeenCalledWith(userId, updateFullUserDto);
    });
  });

  describe('updatePart', () => {
    it('should call usersService.updatePart and return a success message', () => {
      const userId = 1;
      const updatePartUserDto: UpdatePartUserDto = {
        firstName: 'Jane',
      };
      jest.spyOn(service, 'updatePart').mockReturnValue(`This action updates a #${userId} user partially`);

      expect(controller.updatePart(userId.toString(), updatePartUserDto)).toEqual(`This action updates a #${userId} user partially`);
      expect(service.updatePart).toHaveBeenCalledWith(userId, updatePartUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove and return a success message', () => {
      const userId = 1;
      jest.spyOn(service, 'remove').mockReturnValue(`This action removes a #${userId} user`);

      expect(controller.remove(userId.toString())).toEqual(`This action removes a #${userId} user`);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});
