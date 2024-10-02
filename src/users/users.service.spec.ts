import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdatePartUserInputDto } from './dto/update-part-user-input.dto';
import { UpdateFullUserInputDto } from './dto/update-full-user-input.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a success message when creating a user', () => {
      const createUserDto: CreateUserInputDto = {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        isStudent: false,
        email: 'john.doe@example.com',
        password: 'password123',
      };
      expect(service.create(createUserDto)).toEqual('This action adds a new user');
    });
  });

  describe('findAll', () => {
    it('should return a list of users', () => {
      expect(service.findAll()).toEqual('This action returns all users');
    });
  });

  describe('findOne', () => {
    it('should return a specific user message', () => {
      const userId = 1;
      expect(service.findOne(userId)).toEqual(`This action returns a #${userId} user`);
    });
  });

  describe('updateFull', () => {
    it('should return a success message when updating a user', () => {
      const userId = 1;
      const updateFullUserDto: UpdateFullUserInputDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 30,
        isStudent: true,
        email: 'jane.doe@example.com',
        password: 'strongpassword123',
      };
      expect(service.updateFull(userId, updateFullUserDto)).toEqual(`This action updates a #${userId} user`);
    });
  });

  describe('updatePart', () => {
    it('should return a success message when partially updating a user', () => {
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
      expect(service.updatePart(userId, updatePartUserDto)).toEqual(`This action updates a #${userId} user partially`);
    });
  });

  describe('remove', () => {
    it('should return a success message when removing a user', () => {
      const userId = 1;
      expect(service.remove(userId)).toEqual(`This action removes a #${userId} user`);
    });
  });
});