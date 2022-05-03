import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from 'src/middlewares/logger.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("");
  }
}
