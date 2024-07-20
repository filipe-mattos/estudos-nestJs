import { IsEmail, IsString, IsStrongPassword } from 'class-validator';


//Aplicando ao DTO as validacoes do class validator
export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
  })
  password: string;


}