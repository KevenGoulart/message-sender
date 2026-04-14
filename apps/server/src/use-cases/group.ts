import { Injectable } from '@nestjs/common';
import { GroupRepository } from 'src/repositories/group-repository';

@Injectable()
export class GroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async createGroup(name: string) {
    await this.groupRepository.createGroup(name);
  }

  async addToGroup(email: string, name: string, groupId: string) {
    await this.groupRepository.addToGroup(email, name, groupId);
  }

  async removeFromGroup(email: string, groupId: string) {
    await this.groupRepository.removeFromGroup(email, groupId);
  }

  async findAllGroups() {
    const members = await this.groupRepository.findAllGroups();
    return members;
  }
}
