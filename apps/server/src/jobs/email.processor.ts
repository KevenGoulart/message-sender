import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EmailRepository } from 'src/repositories/email-repository';
import { Job } from 'bullmq';

export const EMAIL_QUEUE = 'email-queue';

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
  constructor(private emailRepository: EmailRepository) {
    super();
  }

  async process(job: Job<{ to: string; subject: string; html: string }>) {
    const { to, subject, html } = job.data;
    await this.emailRepository.sendEmail(to, subject, html);
  }
}
