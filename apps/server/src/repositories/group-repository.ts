import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  createGroup(name: string, userId: string) {
    return this.prisma.group.create({
      data: {
        name,
        userId,
      },
    });
  }

  findAllGroups(userId: string) {
    return this.prisma.group.findMany({
      where: {
        userId,
      },
      include: {
        receiver: {
          include: {
            receiver: true,
          },
        },
      },
    });
  }

  async addToGroup(
    email: string,
    name: string,
    groupId: string,
    userId: string,
  ) {
    const existingReceiver = await this.prisma.receiver.findFirst({
      where: {
        email,
        userId,
      },
    });

    if (existingReceiver) {
      throw new ConflictException('Receiver already exists');
    }

    const receiver = await this.prisma.receiver.create({
      data: {
        email,
        name,
        userId,
      },
    });

    return this.prisma.receiversGroups.create({
      data: {
        groupId,
        receiverId: receiver.id,
        userId,
      },
    });
  }

  async removeFromGroup(email: string, groupId: string, userId: string) {
    const receiver = await this.prisma.receiver.findUnique({
      where: {
        email,
        userId,
      },
    });

    if (!receiver) {
      throw new ConflictException('Receiver not found');
    }

    return this.prisma.receiversGroups.deleteMany({
      where: {
        groupId,
        receiverId: receiver.id,
      },
    });
  }
}
