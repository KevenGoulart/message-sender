import { EnvModule } from 'src/env/env.module';
import { Module } from '@nestjs/common';
import { EmailRepository } from 'src/repositories/email-repository';
import { EmailUseCase } from 'src/use-cases/email';
import { EmailProcessor } from 'src/jobs/email.processor';
import { EMAIL_QUEUE } from 'src/jobs/email.processor';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    EnvModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: EMAIL_QUEUE,
      adapter: BullMQAdapter,
    }),
    BullModule.registerQueue({ name: EMAIL_QUEUE }),
  ],
  providers: [EmailRepository, EmailProcessor, EmailUseCase],
  exports: [BullModule, EmailUseCase],
})
export class BullmqModule {}
