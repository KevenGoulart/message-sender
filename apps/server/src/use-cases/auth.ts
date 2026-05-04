/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { HttpException, Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/repositories/auth-repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpException('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authRepository.register(email, hashedPassword);

    return {
      user: { id: user.id, email: user.email },
    };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Wrong password', 401);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      user: { id: user.id, email: user.email },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
