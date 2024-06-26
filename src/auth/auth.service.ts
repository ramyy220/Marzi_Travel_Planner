import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { forgotPasswordDto } from './dto/forgotPasswordDto';
import * as speakeasy from 'speakeasy';
import { forgotPasswordConfDto } from './dto/forgotPasswordConfDto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService : PrismaService,
                private readonly mailService : MailService,
                private readonly jwtService : JwtService,
                private readonly configService : ConfigService,
        ) {}

        async signup(SignupDto: SignupDto) {
            const {email, password, username} = SignupDto
            // verifier si l'utilisateur est deja inscrit
             const user = await this.prismaService.user.findUnique({where : {email}})
             if (user) {
                 throw new ConflictException('User already exists')
             }
             // hasher le mot de passe
             const hash = await bcrypt.hash(password, 10)
            // enregistrer l'utilisateur dans la base de donnees
             await this.prismaService.user.create({data : {email, username, password: hash}})
            // envoyer un mail de confirmation a l'utilisateur
             await this.mailService.SendSignupMailConfirmation(email)

                return {message : 'User created'}

    
            } 

        async signin(SigninDto: SigninDto) {
             const {email, password} = SigninDto;
                // verifier si l'utilisateur existe
                const user = await this.prismaService.user.findUnique({where : {email}})
                if (!user) {
                    throw new NotFoundException('User does not exist')
                }
                // verifier si le mot de passe est correct
                const bool = await bcrypt.compare(password, user.password)
                if (!bool) {
                 throw new UnauthorizedException('Invalid password')
                }
                // creer un token JWT
                const payload = {
                    sub : user.userId,
                    email : user.email
                }
                
                const token = this.jwtService.sign(payload, {expiresIn : '1h', secret : this.configService.get('SECRET_KEY')})
                return {token, user : {email : user.email, username : user.username}, message : 'User signed in'}
        
            }

        async forgotPassword(forgotPasswordDto: forgotPasswordDto) {
            const {email} = forgotPasswordDto;
                // verifier si l'utilisateur existe
                const user = await this.prismaService.user.findUnique({where : {email}})
                if (!user) {
                    throw new NotFoundException('User does not exist')
                }
                // generer un code de verification
                const code = speakeasy.totp({
                    secret: this.configService.get('OTP_CODE'),
                    encoding: 'base32',
                    digits: 6,
                    step: 60 * 10,
                })

                // envoyer le code de verification par mail 
                const url = `http://localhost:3000/verifyotp` //changera avec le front après
                await this.mailService.SendForgotPasswordMail(email, code, url)
                return {message : 'Code sent'}
                // ** enregistrer le code de verification dans la base de données
            }

        async forgotPasswordConf (forgotPasswordConfDto: forgotPasswordConfDto) {
            const {code} = forgotPasswordConfDto;
            // verifier si le code est correct
            const verified = speakeasy.totp.verify({
                secret: this.configService.get('OTP_CODE'),
                encoding: 'base32',
                token: code,
                window: 1,
            })
            if (!verified) {
                throw new UnauthorizedException('Invalid code')
            }
            }

            async updateProfile(userId: number, username: string, password: string) {
                // verifier si l'utilisateur existe
                let payload = {}
                if(username){
                    payload = {username}
                }
                const user = await this.prismaService.user.findUnique({where : {userId}});
                if (!user) {
                    throw new NotFoundException('User does not exist')
                }
                // hasher le mot de passe
                if(password){
                    const hash = await bcrypt.hash(password, 10)
                    payload = {...payload, password : hash}
                }
                // mettre a jour le profile
                try {
                    await this.prismaService.user.update({where : {userId}, data : {...payload}});
                    return {message : 'Profile updated'};
                } catch (error) {
                    throw new InternalServerErrorException('Error updating profile');
                }
            }

    
            

}
