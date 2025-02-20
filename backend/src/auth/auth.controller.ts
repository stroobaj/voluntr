import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@/user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() signupDto: SignupDto
  ): Promise<{ message: string; user: User }> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto
  ): Promise<{ message: string; user: User; access_token: string }> {
    return this.authService.login(loginDto);
  }
}
