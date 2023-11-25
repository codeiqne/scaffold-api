import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsAscii, IsNotEmpty } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsAscii()
    @IsNotEmpty()
    id: string;

    @IsAscii()
    name: string;

    owner: string;
}
