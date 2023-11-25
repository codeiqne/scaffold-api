import { IsAlphanumeric, IsAscii, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsAscii()
    @IsNotEmpty()
    password: string
}
