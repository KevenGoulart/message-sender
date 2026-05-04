import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE } from 'src/schedules/bullmq/jobs/email.processor';
import { EmailRepository } from 'src/repositories/email-repository';

@Injectable()
export class EmailUseCase {
  constructor(
    @InjectQueue(EMAIL_QUEUE) private emailQueue: Queue,
    private emailRepository: EmailRepository,
  ) {}

  async sendEmail(to: string, subject: string, html: string, userId: string) {
    await this.emailQueue.add('sendEmail', { to, subject, html });
    await this.emailRepository.saveEmailHistory(to, subject, html, userId);
    return { message: 'Email sent successfully' };
  }

  async getEmailHistory(userId: string) {
    const emailHistory = await this.emailRepository.getEmailHistory(userId);
    return emailHistory;
  }
}
