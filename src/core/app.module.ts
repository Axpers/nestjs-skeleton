import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { validate } from './schemas/env.validation';
import { UserEntity } from 'src/modules/user/repositories/entities/user.entity';
import { ResourceEntity } from 'src/modules/resource/repositories/entities/resource.entity';
import { ResourceModule } from 'src/modules/resource/resource.module';
import { RightsGuard } from './guards/rights.guard';

@Module({
  imports: [
    UserModule,
    ResourceModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validate }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port: configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USERNAME'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
          entities: [UserEntity, ResourceEntity],
          synchronize: true,
          retryAttempts: 2,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RightsGuard,
    },
  ],
})
export class AppModule {}
