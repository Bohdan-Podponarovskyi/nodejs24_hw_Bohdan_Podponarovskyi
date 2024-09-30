import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartUserDto } from './dto/update-part-user.dto';
import { UpdateFullUserDto } from './dto/update-full-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
  updateFull(@Param('id', ParseIntPipe) id: number, @Body() updateFullUserDto: UpdateFullUserDto) {
    return this.usersService.updateFull(id, updateFullUserDto);
  }

  @Patch(':id')
  updatePart(@Param('id', ParseIntPipe) id: number, @Body() UpdatePartUserDto: UpdatePartUserDto) {
    return this.usersService.updatePart(id, UpdatePartUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
