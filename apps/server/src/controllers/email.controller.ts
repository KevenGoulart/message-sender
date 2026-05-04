import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { EmailUseCase } from 'src/use-cases/email';

class SendEmailDto {
  @IsEmail()
  to!: string;

  @IsString()
  subject!: string;

  @IsString()
  html!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
  constructor(private readonly emailUseCase: EmailUseCase) {}

  @Post('send')
  sendEmail(@Body() body: SendEmailDto, @CurrentUser() user: { sub: string }) {
    return this.emailUseCase.sendEmail(
      body.to,
      body.subject,
      body.html,
      user.sub,
    );
  }

  @Get('history')
  getEmailHistory(@CurrentUser() user: { sub: string }) {
    const data = this.emailUseCase.getEmailHistory(user.sub);
    return data;
  }
}
