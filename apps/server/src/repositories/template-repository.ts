import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplateRepository {
  constructor(private prisma: PrismaService) {}

  createTemplate(name: string, content: string, userId: string) {
    return this.prisma.template.create({
      data: { name, content, userId },
    });
  }

  findAllTemplates(userId: string) {
    return this.prisma.template.findMany({
      where: {
        userId,
      },
    });
  }

  editTemplate(
    templateId: string,
    name: string,
    content: string,
    userId: string,
  ) {
    return this.prisma.template.update({
      where: { id: templateId, userId },
      data: { name, content },
    });
  }

  deleteTemplate(templateId: string, userId: string) {
    return this.prisma.template.delete({
      where: { id: templateId, userId },
    });
  }
}
