import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(){}

    getAllUsers () {
        // return this.userRepository.find();
    }

    createUser (body: CreateUserDto) {
        // return this.userRepository.create(body)
    }

}
