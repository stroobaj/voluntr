import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;
}
