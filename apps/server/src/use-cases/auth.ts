/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/repositories/auth-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async register(email: string, password: string) {
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authRepository.register(email, hashedPassword);

    return {
      user: { id: user.id, email: user.email },
    };
  }

  login() {
    return 'Hello World!';
  }
}
