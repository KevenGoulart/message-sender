import { PrismaClient } from 'generated/prisma/client';
import { EmailRepository } from './email-repository';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';

const prisma = new PrismaClient();
let emailRepository: EmailRepository;

beforeAll(() => {
  emailRepository = new EmailRepository(prisma);
});

afterEach(async () => {
  await prisma.emailHistory.deleteMany();
});

describe('Email Repository', () => {
  describe('send email', () => {
    it('should send a email and save history', async () => {
      await expect(
        emailRepository.sendEmail(
          'kevengoulartmm@gmail.com',
          'teste vitest',
          '<p>placeholder</p>',
        ),
      ).resolves.not.toThrow();
    });
  });

  describe('save email', () => {
    it('should save the email sent', async () => {
      await emailRepository.saveEmailHistory(
        'kevengoulartmm@gmail.com',
        'salvar vitest',
        '<p>placeholder</p>',
      );

      const history = await prisma.emailHistory.findMany();

      expect(history).toHaveLength(1);
      expect(history[0]).toMatchObject({
        sentTo: 'kevengoulartmm@gmail.com',
        subject: 'salvar vitest',
        body: '<p>placeholder</p>',
      });
    });
  });
});
