import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.repository';

@Module({
  providers: [UserService, User],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
