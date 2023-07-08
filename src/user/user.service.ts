import { Injectable } from '@nestjs/common';
import { User } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
      private userRepository: User  
    ){}

    getAllUsers () {
        return this.userRepository.find();
    }

    createUser (body: CreateUserDto) {
        return this.userRepository.create(body)
    }

}
