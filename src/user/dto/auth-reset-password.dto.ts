import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetPasswordDto {
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1
  })
  password: string;
}