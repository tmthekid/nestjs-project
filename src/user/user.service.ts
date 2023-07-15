import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async getAllUsers (): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById (id: number): Promise<User> {
        return await this.userRepository.query('SELECT * FROM users WHERE id = $1', [id]);
    }

    createUser (body: CreateUserDto) {
        // return this.userRepository.create(body)
    }

}
