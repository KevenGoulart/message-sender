import { Body, Controller, Post } from '@nestjs/common';
import { AuthUseCase } from 'src/use-cases/auth';
import { IsEmail, MinLength } from 'class-validator';

class RegisterDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}

@Controller('users')
export class AppController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authUseCase.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: RegisterDto) {
    return this.authUseCase.login(body.email, body.password);
  }
}
