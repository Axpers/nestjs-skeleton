import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'skeleton',
      password: 'skeleton',
      database: 'skeleton',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 5,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
