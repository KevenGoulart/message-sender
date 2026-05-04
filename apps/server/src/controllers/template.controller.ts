import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
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

@UseGuards(JwtAuthGuard)
@Controller('template')
export class TemplateController {
  constructor(private readonly templateUseCase: TemplateUseCase) {}

  @Post('create')
  createTemplate(
    @Body() body: CreateTemplateDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.templateUseCase.createTemplate(
      body.name,
      body.content,
      user.sub,
    );
  }

  @Put('edit')
  editTemplate(
    @Body() body: EditTemplateDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.templateUseCase.editTemplate(
      body.templateId,
      body.name,
      body.content,
      user.sub,
    );
  }

  @Get('all')
  findAllTemplates(@CurrentUser() user: { sub: string }) {
    return this.templateUseCase.findAllTemplates(user.sub);
  }

  @Delete('delete')
  deleteTemplate(
    @Body('templateId') templateId: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.templateUseCase.deleteTemplate(templateId, user.sub);
  }
}
