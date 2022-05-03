import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from 'src/middlewares/logger.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("");
  }
}
