import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() authDto: AuthDto
  ): Promise<{ message: string; user: any }> {
    return this.authService.signup(authDto);
  }

  @Post('login')
  public async login(
    @Body() authDto: AuthDto
  ): Promise<{ message: string; user: any }> {
    return this.authService.login(authDto);
  }
}
