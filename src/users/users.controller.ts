import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdatePartUserInputDto } from './dto/update-part-user-input.dto';
import { UpdateFullUserInputDto } from './dto/update-full-user-input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserInputDto: CreateUserInputDto) {
    return this.usersService.create(createUserInputDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateFull(@Param('id', ParseIntPipe) id: number, @Body() updateFullUserInputDto: UpdateFullUserInputDto) {
    return this.usersService.updateFull(id, updateFullUserInputDto);
  }

  @Patch(':id')
  updatePart(@Param('id', ParseIntPipe) id: number, @Body() updatePartUserInputDto: UpdatePartUserInputDto) {
    return this.usersService.updatePart(id, updatePartUserInputDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
