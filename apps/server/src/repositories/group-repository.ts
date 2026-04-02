import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  createGroup(name: string) {
    return this.prisma.group.create({
      data: {
        name,
      },
    });
  }

  async addToGroup(email: string, name: string, groupId: string) {
    const existingReceiver = await this.prisma.receiver.findFirst({
      where: {
        email,
      },
    });

    if (existingReceiver) {
      throw new ConflictException('Receiver already exists');
    }

    const receiver = await this.prisma.receiver.create({
      data: {
        email,
        name,
      },
    });

    return this.prisma.receiversGroups.create({
      data: {
        groupId,
        receiverId: receiver.id,
      },
    });
  }

  findAllGroups() {
    return this.prisma.group.findMany({
      include: {
        receiver: {
          include: {
            receiver: true,
          },
        },
      },
    });
  }
}
