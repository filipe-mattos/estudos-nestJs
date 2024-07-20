import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller("users")
export class UserController {

  @Post()
  async create(@Body() body){
    return {body:body}
  }

  @Get()
  async readAll(){
    return {users: []};
  }

  @Get(":id")
  async readOne(@Param("id") params){
    return {users: {}, params};
  }

  @Put(":id")
  async update(@Body() body, @Param("id") id){
    return {users: {}, body, id};
  }

  @Patch(":id")
  async updatePartial(@Body() body, @Param("id") id){
    return {users: {}, body, id};
  }

  @Delete(":id")
  async delete(@Param() params){
    return {users: {}, params}
  }
}