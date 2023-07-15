import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    host: 'localhost',
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'cars',
    port: 5433,
    entities: [User],
    synchronize: true,
    dropSchema: false,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
