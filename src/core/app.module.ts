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
import { RightsGuard } from './guards/rights.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validate }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configSerice: ConfigService) => {
        return {
          type: 'postgres',
          host: configSerice.getOrThrow('DB_HOST'),
          port: configSerice.getOrThrow('DB_PORT'),
          username: configSerice.getOrThrow('DB_USERNAME'),
          password: configSerice.getOrThrow('DB_PASSWORD'),
          database: configSerice.getOrThrow('DB_DATABASE'),
          autoLoadEntities: true,
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
