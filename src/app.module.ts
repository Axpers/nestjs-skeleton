import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.1.17',
      port: 3306,
      username: 'skeleton',
      password: 'skeleton',
      database: 'skeleton',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 2,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
