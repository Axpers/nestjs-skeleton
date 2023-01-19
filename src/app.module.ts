import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'skeleton-db-user',
      password: 'skeleton-db-password',
      database: 'skeleton-db-name',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 2,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
