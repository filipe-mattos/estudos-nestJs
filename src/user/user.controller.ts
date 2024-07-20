import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';

@Controller("users")
export class UserController {

  @Post()
  async create(@Body() body: CreateUserDto){
    return {body:body}
  }

  @Get()
  async readAll(){
    return {users: []};
  }

  @Get(":id")
  async readOne(@Param("id", ParseIntPipe) id){
    return {users: {}, id};
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