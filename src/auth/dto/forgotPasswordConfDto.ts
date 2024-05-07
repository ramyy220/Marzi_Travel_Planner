import {IsNotEmpty} from "class-validator"
export class forgotPasswordConfDto {
    @IsNotEmpty()   
    readonly code : string

}