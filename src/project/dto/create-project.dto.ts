import { IsAscii, IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsAscii()
    name: string;

    @IsAscii()
    id: string;
}
