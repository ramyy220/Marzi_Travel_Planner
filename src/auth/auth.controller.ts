import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { forgotPasswordDto } from './dto/forgotPasswordDto';
import { forgotPasswordConfDto } from './dto/forgotPasswordConfDto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    @Post('signup')
    signup(@Body() SignupDto : SignupDto) {
        return this.authService.signup(SignupDto)
    }

    @Post('signin')
    signin(@Body() SigninDto : SigninDto) {
        return this.authService.signin(SigninDto)
    }
    
    @Post('forgotPassword')
    forgotPassword(@Body() forgotPasswordDto : forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto)
    }

    @Post('forgotPasswordConf')
    forgotPasswordConf(@Body() forgotPasswordConfDto : forgotPasswordConfDto) {
        return this.authService.forgotPasswordConf(forgotPasswordConfDto)
    }

}
