import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Role } from '../../enums/role.enum';


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

  @IsOptional()
  birthAt: string;

  @IsOptional()
  @IsEnum(Role)
  role: number


}