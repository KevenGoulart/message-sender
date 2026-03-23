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
import { EMAIL_QUEUE } from './jobs/email.processor';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
    BullmqModule,
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: EMAIL_QUEUE,
      adapter: BullMQAdapter,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController, EmailController],
  providers: [AuthUseCase, AuthRepository],
})
export class AppModule {}
