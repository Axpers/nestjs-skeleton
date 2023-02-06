import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserReponse } from 'src/modules/user/controllers/responses/user-response.dto';
import { UserControllerReponseAdapter } from 'src/modules/user/controllers/user-controller-response.adapter';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { JwtPayload } from '../domain/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private userControllerReponseAdapter: UserControllerReponseAdapter,
  ) {
    super({
      secretOrKey: 'defaultSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserReponse> {
    const userId = payload.id;
    const user = await this.userRepository.getUserById(userId);

    if (user === null) {
      throw new UnauthorizedException();
    }

    const adaptedUser = this.userControllerReponseAdapter.adaptUser(user);
    return adaptedUser;
  }
}
