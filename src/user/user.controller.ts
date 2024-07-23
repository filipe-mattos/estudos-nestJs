import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserService } from './user.service';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Post()
  async create(@Body() data: CreateUserDto){
    return this.userService.create(data)
  }

  @Get()
  async readAll(){
    return this.userService.list();
  }

  @Get(":id")
  async readOne(@Param("id", ParseIntPipe) id: number){
    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() body: UpdatePutUserDto, @Param("id", ParseIntPipe) id){
    return {users: {}, body, id};
  }

  @Patch(":id")
  async updatePartial(@Body() body, @Param("id", ParseIntPipe) id){
    return {users: {}, body, id};
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id){
    return {users: {}, id}
  }
}