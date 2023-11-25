import { IsAscii, IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsAscii()
    @IsNotEmpty()
    password: string
}