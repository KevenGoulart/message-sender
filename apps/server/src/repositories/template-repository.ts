import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplateRepository {
  constructor(private prisma: PrismaService) {}

  createTemplate(name: string, content: string) {
    return this.prisma.template.create({
      data: { name, content },
    });
  }

  editTemplate(templateId: string, name: string, content: string) {
    return this.prisma.template.update({
      where: { id: templateId },
      data: { name, content },
    });
  }

  findAllTemplates() {
    return this.prisma.template.findMany();
  }

  deleteTemplate(templateId: string) {
    return this.prisma.template.delete({
      where: { id: templateId },
    });
  }
}
