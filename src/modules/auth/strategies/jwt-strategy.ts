import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/domain/user';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { JwtPayload } from '../domain/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'defaultSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const userId = payload.id;
    const user = await this.userRepository.getUserById(userId);

    if (user === null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
