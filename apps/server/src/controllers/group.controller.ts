import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { GroupUseCase } from 'src/use-cases/group';

class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

class AddToGroupDto {
  @IsNotEmpty()
  groupId!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

@Controller('group')
export class GroupController {
  constructor(private readonly groupUseCase: GroupUseCase) {}

  @Post('create')
  createGroup(@Body() body: CreateGroupDto) {
    return this.groupUseCase.createGroup(body.name);
  }

  @Post('add-to-group')
  addToGroup(@Body() body: AddToGroupDto) {
    return this.groupUseCase.addToGroup(body.email, body.name, body.groupId);
  }

  @Get('all')
  findAllGroups() {
    return this.groupUseCase.findAllGroups();
  }
}
