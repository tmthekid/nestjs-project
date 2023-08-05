import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, Session, UnauthorizedException } from '@nestjs/common';
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
    getUsersAdmin(@Session() session: any, @Request() req: any) {
        console.log('request.session', req.session);

        if (!session.user) {
            throw new UnauthorizedException();
        }

        return this.userService.getUserById(1);
    }

    @Post('login')
    login(@Session() session: any) {
        session.user = { id: 123, name: 'appUser' };
    }

    @Get('auth-user')
    getSession(@Session() session: any) {
        return session.user;
    }

    @Post('logout')
    logout(@Session() session: any) {
        session.user = null;
    }
}
