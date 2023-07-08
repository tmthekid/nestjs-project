import { readFile, writeFile } from "fs/promises";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class User {
    
    async find () {
        const users = await readFile('users.json', 'utf-8');
        return JSON.parse(users);    
    }

    async create (body: CreateUserDto) {
        const foundUsers = await this.find();
        foundUsers.push(body);

        await writeFile('users.json', JSON.stringify(foundUsers))
        return 'Ok';
    }
}