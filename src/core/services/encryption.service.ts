import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly keyLength = 64;
  private readonly hashAndSaltSeparator = ':';

  constructor() {}

  getHashedPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, this.keyLength).toString(
      'hex',
    );
    const saltedHash = `${salt}${this.hashAndSaltSeparator}${hashedPassword}`;
    return saltedHash;
  }

  arePasswordsMatching(rawPassword: string, storedPassword: string): boolean {
    const [storedSalt, storedKey] = storedPassword.split(
      this.hashAndSaltSeparator,
    );

    const hashedKeyBuffer = Buffer.from(storedKey, 'hex');
    const derivedKey = scryptSync(rawPassword, storedSalt, this.keyLength);

    const arePasswordsMatching = timingSafeEqual(hashedKeyBuffer, derivedKey);
    return arePasswordsMatching;
  }
}
