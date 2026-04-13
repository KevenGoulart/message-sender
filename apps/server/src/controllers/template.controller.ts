import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
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

class EditTemplateDto {
  @IsString()
  @IsNotEmpty()
  templateId!: string;

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

  @Put('edit')
  editTemplate(@Body() body: EditTemplateDto) {
    return this.templateUseCase.editTemplate(
      body.templateId,
      body.name,
      body.content,
    );
  }

  @Get('all')
  findAllTemplates() {
    return this.templateUseCase.findAllTemplates();
  }

  @Delete('delete')
  deleteTemplate(@Body('templateId') templateId: string) {
    return this.templateUseCase.deleteTemplate(templateId);
  }
}
