import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { TemplateUseCase } from 'src/use-cases/template';

class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}

@Controller('template')
export class TemplateController {
  constructor(private readonly templateUseCase: TemplateUseCase) {}

  @Post('create')
  createTemplate(@Body() body: CreateTemplateDto) {
    return this.templateUseCase.createTemplate(body.name, body.content);
  }

  @Get('all')
  findAllTemplates() {
    return this.templateUseCase.findAllTemplates();
  }
}
