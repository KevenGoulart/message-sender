import { Injectable } from '@nestjs/common';
import { TemplateRepository } from 'src/repositories/template-repository';

@Injectable()
export class TemplateUseCase {
  constructor(private templateRepository: TemplateRepository) {}

  async createTemplate(name: string, content: string, userId: string) {
    await this.templateRepository.createTemplate(name, content, userId);
  }

  async findAllTemplates(userId: string) {
    const templates = await this.templateRepository.findAllTemplates(userId);
    return templates;
  }

  async editTemplate(
    templateId: string,
    name: string,
    content: string,
    userId: string,
  ) {
    await this.templateRepository.editTemplate(
      templateId,
      name,
      content,
      userId,
    );
  }

  async deleteTemplate(templateId: string, userId: string) {
    await this.templateRepository.deleteTemplate(templateId, userId);
  }
}
