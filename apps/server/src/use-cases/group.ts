import { Injectable } from '@nestjs/common';
import { GroupRepository } from 'src/repositories/group-repository';

@Injectable()
export class GroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async createGroup(name: string, userId: string) {
    await this.groupRepository.createGroup(name, userId);
  }

  async findAllGroups(userId: string) {
    const members = await this.groupRepository.findAllGroups(userId);
    return members;
  }

  async addToGroup(
    email: string,
    name: string,
    groupId: string,
    userId: string,
  ) {
    await this.groupRepository.addToGroup(email, name, groupId, userId);
  }

  async removeFromGroup(email: string, groupId: string, userId: string) {
    await this.groupRepository.removeFromGroup(email, groupId, userId);
  }
}
