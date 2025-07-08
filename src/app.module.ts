import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user/entities/user.entity';
import { AuthModule } from './domain/auth/auth.module';
import { dataSourceOptions } from '../database/data-source';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';
import { TasksModule } from './domain/tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    TasksModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
