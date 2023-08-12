import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, Response as ResponseNest, Session, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { SerialiseInterceptor } from './interceptor/serialise.interceptor';
import { LoginDTO } from './dto/login.dto';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

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
        console.log('REQUEST', req.cookies);
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
    @UsePipes(new ValidationPipe())
    async login(@Body() body: LoginDTO, @ResponseNest() res: Response) {
        const user = await this.userService.verifyUser(body);

        if (!user) {
            throw new BadRequestException('Wrong credentials!')
        }

        const jwtPayload = { userId: user.id };

        const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

        const accessToken = sign(jwtPayload, accessSecret, {
            expiresIn: '1m',
        });

        const refreshToken = sign(jwtPayload, refreshSecret, {
            expiresIn: '7d',
        });

        res.cookie('rtsc', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60*60*24*7,
        });

        res.json({ accessToken });
    }

    // @Post('login')
    // login(@Session() session: any) {
    //     session.user = { id: 123, name: 'appUser' };
    // }
    //
    // @Get('auth-user')
    // getSession(@Session() session: any) {
    //     return session.user;
    // }
    //
    // @Post('logout')
    // logout(@Session() session: any) {
    //     session.user = null;
    // }
}
