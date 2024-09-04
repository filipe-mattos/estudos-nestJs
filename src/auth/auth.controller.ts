import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator,
} from '@nestjs/common';
import { AuthLoginDto } from '../user/dto/auth-login.dto';
import { AuthRegisterDto } from '../user/dto/auth-register.dto';
import { AuthForgetPasswordDto } from '../user/dto/auth-forget-password.dto';
import { AuthResetPasswordDto } from '../user/dto/auth-reset-password.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {writeFile} from 'fs/promises';
import {join} from 'path';
import { FileService } from '../file/file.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto){
    return this.authService.login(email, password)
  }

  @Post('register')
  async create(@Body() body: AuthRegisterDto){
    return this.authService.register(body);
  }

  @Post('forgetPassword')
  async forgetPassward(@Body() { email }: AuthForgetPasswordDto){
    return this.authService.forgotPassword(email)
  }

  @UseGuards(AuthGuard)
  @Post('resetPassword')
  async resetPassword(@Body() {password}: AuthResetPasswordDto){
    return this.authService.resetPassword(password)
  }

  @UseGuards(AuthGuard)
  @Post()
  async auth(@User() user){
    return {user: user};
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadSinglePhoto(
    @User() user,
    @UploadedFile(new ParseFilePipe({
      //Utilizando o file pipe para aplicar validacoes nos arquivos
      validators: [
        new FileTypeValidator({fileType: 'image/png'}),
        new MaxFileSizeValidator({maxSize: 1024 * 50})
      ]
    })) photo: Express.Multer.File) {
      const path = join(__dirname, '..', '..', 'storage', 'user-photos', `photo-uID-${user.id}.png`);
      try {
        await this.fileService.upload(photo, path);
      } catch (error) {
        throw new BadRequestException(error);
      }
      return true
  }


  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('photos')
  async uploadMultiPhotos(@User() user, @UploadedFiles() photos: Express.Multer.File[]){
    return photos;
  }

  @UseInterceptors(FileFieldsInterceptor([{
    name: 'photo',
    maxCount: 1
  },{
    name: 'documents',
    maxCount: 10
  }]))
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {
    return files;
  }
}