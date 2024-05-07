import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}