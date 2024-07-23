import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserService } from './user.service';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { LogInterceptor } from '../interceptors/log.interceptor';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @UseInterceptors(LogInterceptor)
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
  async update(@Body() body: UpdatePutUserDto, @Param("id", ParseIntPipe) id: number){
    return this.userService.update(body, id);
  }

  @Patch(":id")
  async updatePartial(@Body() body: UpdatePatchUserDto, @Param("id", ParseIntPipe) id: number){
    return this.userService.updatePartial(body, id);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number){
    return this.userService.delete(id);
  }
}