import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @Length(4, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}
