import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
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

class RemoveFromGroupDto {
  @IsNotEmpty()
  groupId!: string;

  @IsEmail()
  email!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupUseCase: GroupUseCase) {}

  @Post('create')
  createGroup(
    @Body() body: CreateGroupDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.groupUseCase.createGroup(body.name, user.sub);
  }

  @Post('add-to-group')
  addToGroup(
    @Body() body: AddToGroupDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.groupUseCase.addToGroup(
      body.email,
      body.name,
      body.groupId,
      user.sub,
    );
  }

  @Delete('remove-from-group')
  removeFromGroup(
    @Body() body: RemoveFromGroupDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.groupUseCase.removeFromGroup(
      body.email,
      body.groupId,
      user.sub,
    );
  }

  @Get('all')
  findAllGroups(@CurrentUser() user: { sub: string }) {
    return this.groupUseCase.findAllGroups(user.sub);
  }
}
