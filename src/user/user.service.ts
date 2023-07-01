import { Injectable } from '@nestjs/common';
import { User } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
export class UserService {
    userRepository: User
    constructor(){
        this.userRepository = new User();
    }

    getAllUsers () {
        return this.userRepository.find();
    }

    createUser (body: CreateUserDto) {
        return this.userRepository.create(body)
    }

}
