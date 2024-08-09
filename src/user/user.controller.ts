import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserService } from './user.service';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
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
  async readOne(@ParamId() id: number){
    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() body: UpdatePutUserDto, @ParamId() id: number){
    return this.userService.update(body, id);
  }

  @Patch(":id")
  async updatePartial(@Body() body: UpdatePatchUserDto, @ParamId() id: number){
    return this.userService.updatePartial(body, id);
  }

  @Delete(":id")
  async delete(@ParamId() id: number){
    return this.userService.delete(id);
  }
}