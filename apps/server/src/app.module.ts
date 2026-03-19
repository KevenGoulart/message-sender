/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Module } from '@nestjs/common';
import { AppController } from './controllers/auth.controller';
import { AuthUseCase } from './use-cases/auth';
import { AuthRepository } from './repositories/auth-repository';
import { PrismaModule } from './prisma/prisma.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AuthUseCase, AuthRepository],
})
export class AppModule {}
