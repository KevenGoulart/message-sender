import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailRepository {
  private resend: Resend;

  constructor(private prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const { data, error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
  }

  async saveEmailHistory(
    sentTo: string,
    subject: string,
    body: string,
    userId: string,
  ) {
    await this.prisma.emailHistory.create({
      data: {
        sentTo,
        subject,
        body,
        userId,
      },
    });
  }

  async getEmailHistory(userId: string) {
    const emailHistory = await this.prisma.emailHistory.findMany({
      where: {
        userId,
      },
    });
    return emailHistory;
  }
}
