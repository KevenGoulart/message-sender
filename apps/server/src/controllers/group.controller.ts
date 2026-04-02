import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupUseCase } from 'src/use-cases/group';

@Controller('group')
export class GroupController {
  constructor(private readonly groupUseCase: GroupUseCase) {}

  @Post('create')
  createGroup(@Body('name') name: string) {
    return this.groupUseCase.createGroup(name);
  }

  @Post('add-to-group')
  addToGroup(@Body() body: { email: string; name: string; groupId: string }) {
    return this.groupUseCase.addToGroup(body.email, body.name, body.groupId);
  }

  @Get('all')
  findAllGroups() {
    return this.groupUseCase.findAllGroups();
  }
}
