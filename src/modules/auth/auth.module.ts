import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EncryptionService } from 'src/core/services/encryption.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthUtilsService } from './services/auth-utils.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({}),
    JwtModule.register({
      secret: 'defaultSecret',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUtilsService, EncryptionService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
