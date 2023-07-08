import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get()
    getUsers() {
        return this.userService.getAllUsers()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() body: CreateUserDto){
        return this.userService.createUser(body)
    }
}
