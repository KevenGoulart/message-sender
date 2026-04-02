import { Module } from '@nestjs/common';
import { AppController } from './controllers/auth.controller';
import { AuthUseCase } from './use-cases/auth';
import { AuthRepository } from './repositories/auth-repository';
import { PrismaModule } from './prisma/prisma.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailController } from './controllers/email.controller';
import { BullmqModule } from './schedules/bullmq/bullmq.module';
import { EmailUseCase } from './use-cases/email';
import { EmailRepository } from './repositories/email-repository';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repositories/group-repository';
import { GroupUseCase } from './use-cases/group';
import { TemplateController } from './controllers/template.controller';
import { TemplateUseCase } from './use-cases/template';
import { TemplateRepository } from './repositories/template-repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
    BullmqModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AppController,
    EmailController,
    GroupController,
    TemplateController,
  ],
  providers: [
    AuthUseCase,
    AuthRepository,
    EmailUseCase,
    EmailRepository,
    GroupRepository,
    GroupUseCase,
    TemplateUseCase,
    TemplateRepository,
  ],
})
export class AppModule {}
