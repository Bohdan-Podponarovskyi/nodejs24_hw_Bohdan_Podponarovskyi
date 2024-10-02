import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdatePartUserInputDto } from './dto/update-part-user-input.dto';
import { UpdateFullUserInputDto } from './dto/update-full-user-input.dto';

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
      const createUserDto: CreateUserInputDto = {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        isStudent: false,
        email: 'john.doe@example.com',
        password: 'password123',
      };
      jest.spyOn(service, 'create').mockReturnValue('This action adds a new user');

      expect(controller.create(createUserDto)).toEqual('This action adds a new user');
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle errors correctly', () => {
      const createUserDto: CreateUserInputDto = {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        isStudent: false,
        email: 'john.doe@example.com',
        password: 'password123',
      };
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new Error('User creation failed');
      });

      try {
        controller.create(createUserDto);
      } catch (error) {
        expect(error.message).toBe('User creation failed');
      }
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

      expect(controller.findOne(userId)).toEqual(`This action returns a #${userId} user`);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });

    it('should handle non-existent user errors', () => {
      const userId = 999;
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new Error('User not found');
      });

      try {
        controller.findOne(userId);
      } catch (error) {
        expect(error.message).toBe('User not found');
      }
    });
  });

  describe('updateFull', () => {
    it('should call usersService.updateFull and return a success message', () => {
      const userId = 1;
      const updateFullUserDto: UpdateFullUserInputDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 30,
        isStudent: true,
        email: 'jane.doe@example.com',
        password: 'strongpassword123',
      };
      jest.spyOn(service, 'updateFull').mockReturnValue(`This action updates a #${userId} user`);

      expect(controller.updateFull(userId, updateFullUserDto)).toEqual(`This action updates a #${userId} user`);
      expect(service.updateFull).toHaveBeenCalledWith(userId, updateFullUserDto);
    });
  });

  describe('updatePart', () => {
    it('should call usersService.updatePart and return a success message', () => {
      const userId = 1;
      const updatePartUserDto: UpdatePartUserInputDto = {
        firstName: 'Jane',
        // Assuming other optional fields here for partial update, test purpose only
        lastName: 'Doe',
        age: 30,
        isStudent: true,
        email: 'jane.doe@example.com',
        password: 'strongpassword123',
      };
      jest.spyOn(service, 'updatePart').mockReturnValue(`This action updates a #${userId} user partially`);

      expect(controller.updatePart(userId, updatePartUserDto)).toEqual(`This action updates a #${userId} user partially`);
      expect(service.updatePart).toHaveBeenCalledWith(userId, updatePartUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove and return a success message', () => {
      const userId = 1;
      jest.spyOn(service, 'remove').mockReturnValue(`This action removes a #${userId} user`);

      expect(controller.remove(userId)).toEqual(`This action removes a #${userId} user`);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });

    it('should handle non-existent user removal errors', () => {
      const userId = 999;
      jest.spyOn(service, 'remove').mockImplementation(() => {
        throw new Error('User not found');
      });

      try {
        controller.remove(userId);
      } catch (error) {
        expect(error.message).toBe('User not found');
      }
    });
  });
});