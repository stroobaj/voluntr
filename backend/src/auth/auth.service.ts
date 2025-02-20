import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = await this.usersService.create(
      signupDto.email,
      hashedPassword,
      ['USER'],
      signupDto.firstName,
      signupDto.lastName
    );

    return { message: 'User created', user };
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ message: string; user: User; access_token: string }> {
    const user: User | null = await this.usersService.findByEmail(
      loginDto.email
    );
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user._id?.toString(),
      email: user.email,
      roles: user.roles,
    };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
