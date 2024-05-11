import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { forgotPasswordDto } from './dto/forgotPasswordDto';
import { forgotPasswordConfDto } from './dto/forgotPasswordConfDto';
import { UpdateProfileDto } from './dto/updateProfileDto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ContactDto } from './dto/ContactDto';
import { MailService } from 'src/mail/mail.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService, private readonly mailService : MailService) {}
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

    
  @Put('updateProfile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.userId, updateProfileDto.username, updateProfileDto.password);
  }

  @Post('contact')
  async sendContactMessage(@Body() contactDto: ContactDto) {
  return this.mailService.sendContactEmail(contactDto);
}


}
