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
  controllers: [AppController, EmailController],
  providers: [AuthUseCase, AuthRepository, EmailUseCase, EmailRepository],
})
export class AppModule {}
