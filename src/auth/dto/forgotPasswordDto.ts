import {IsNotEmpty, IsEmail} from "class-validator"
export class forgotPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email : string
}