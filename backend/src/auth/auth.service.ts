import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Handles user signup (register).
   */
  async signup(authDto: AuthDto) {
    const existingUser = await this.usersService.findByEmail(authDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const user = await this.usersService.create(authDto.email, hashedPassword);

    return { message: 'User created', user };
  }

  /**
   * Handles user login.
   * If credentials are valid, returns a JWT token.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user.toObject();
    return result;
  }

  /**
   * Generates a JWT token for an authenticated user.
   */
  async login(user: any): Promise<any> {
    const payload = { id: user._id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
