import { Injectable } from '@nestjs/common';
iimport * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor() {}

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async arePasswordsMatching(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isComparisonMatching = await bcrypt.compare(
      rawPassword,
      hashedPassword,
    );

    return isComparisonMatching;
  }
}
