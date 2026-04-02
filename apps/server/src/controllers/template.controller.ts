import { Body, Controller, Get, Post } from '@nestjs/common';
import { TemplateUseCase } from 'src/use-cases/template';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateUseCase: TemplateUseCase) {}

  @Post('create')
  createTemplate(@Body() body: { name: string; content: string }) {
    return this.templateUseCase.createTemplate(body.name, body.content);
  }

  @Get('all')
  findAllTemplates() {
    return this.templateUseCase.findAllTemplates();
  }
}
