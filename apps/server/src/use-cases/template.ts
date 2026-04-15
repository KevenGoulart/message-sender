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

  async editTemplate(templateId: string, name: string, content: string) {
    await this.templateRepository.editTemplate(templateId, name, content);
  }

  async deleteTemplate(templateId: string) {
    await this.templateRepository.deleteTemplate(templateId);
  }
}
