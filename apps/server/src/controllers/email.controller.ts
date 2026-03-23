import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { EmailUseCase } from 'src/use-cases/email';

class SendEmailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailUseCase: EmailUseCase) {}

  @Post('send')
  sendEmail(@Body() body: SendEmailDto) {
    return this.emailUseCase.sendEmail(body.to, body.subject, body.html);
  }
}
