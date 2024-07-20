import { CreateUserDto } from './create-user-dto';
import { PartialType } from '@nestjs/mapped-types';


//Utilizando a biblioteca de mappedTypes por padrao nao vem junto no start do projeto em nestJs precisa ser importada
// npm i @nestjs/mapped-types
export class UpdatePutUserDto extends PartialType(CreateUserDto){

}