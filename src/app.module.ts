import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user/entities/user.entity';
import { AuthModule } from './domain/auth/auth.module';
import { UserController } from './domain/user/user.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'NestJS',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
