import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { TasksModule } from '../tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { OrgsModule } from '../orgs/orgs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // OK for take-home
    }),
    TasksModule,
    UsersModule,
    OrgsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  