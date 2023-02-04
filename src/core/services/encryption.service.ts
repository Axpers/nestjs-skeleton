import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly keyLength = 64;
  private readonly saltLength = 32;
  private readonly hashAndSaltSeparator = ':';
  private readonly bufferEncoding: BufferEncoding = 'hex';

  getHashedPassword(password: string): string {
    const salt = randomBytes(this.saltLength).toString(this.bufferEncoding);
    const hashedPassword = scryptSync(password, salt, this.keyLength).toString(
      this.bufferEncoding,
    );
    const saltedHash = `${salt}${this.hashAndSaltSeparator}${hashedPassword}`;
    return saltedHash;
  }

  arePasswordsMatching(rawPassword: string, storedPassword: string): boolean {
    const [storedSalt, storedKey] = storedPassword.split(
      this.hashAndSaltSeparator,
    );

    const hashedKeyBuffer = Buffer.from(storedKey, this.bufferEncoding);
    const derivedKey = scryptSync(rawPassword, storedSalt, this.keyLength);

    const arePasswordsMatching = timingSafeEqual(hashedKeyBuffer, derivedKey);
    return arePasswordsMatching;
  }
}
