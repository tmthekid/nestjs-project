import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { SerialiseInterceptor } from './interceptor/serialise.interceptor';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() body: CreateUserDto){
        return this.userService.createUser(body)
    }

    @Get('/public')
    @SerialiseInterceptor(UserDTO)
    getUsersPublic(@Request() req: any) {
        console.log('REQUEST', req.user);
        return this.userService.getAllUsers();
    }

    @Get('/admin')
    getUsersAdmin() {
        return this.userService.getUserById(1);
    }
}
