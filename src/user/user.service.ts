import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { hash, verify } from 'argon2';

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

    async createUser (body: CreateUserDto) {
        const { password, ...rest } = body;
        const hashedPassword = await hash(password, { saltLength: 12 });
        const user = this.userRepository.create({ ...rest, password: hashedPassword });
        await this.userRepository.save(user);
    }

    async verifyUser ({ username, password }: LoginDTO): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            return null;
        }

        const isVerified = await verify(user.password, password);
        if (!isVerified) {
            return null;
        }

        return user;
    }

}
