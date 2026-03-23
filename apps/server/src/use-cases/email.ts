import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE } from 'src/jobs/email.processor';

@Injectable()
export class EmailUseCase {
  constructor(@InjectQueue(EMAIL_QUEUE) private emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, html: string) {
    await this.emailQueue.add('sendEmail', { to, subject, html });
    return { message: 'Email sent successfully' };
  }
}
