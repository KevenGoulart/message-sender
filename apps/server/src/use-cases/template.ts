import { Injectable } from '@nestjs/common';
import { TemplateRepository } from 'src/repositories/template-repository';

@Injectable()
export class TemplateUseCase {
  constructor(private templateRepository: TemplateRepository) {}

  async createTemplate(name: string, content: string) {
    await this.templateRepository.createTemplate(name, content);
  }

  async findAllTemplates() {
    const templates = await this.templateRepository.findAllTemplates();
    return templates;
  }
}
