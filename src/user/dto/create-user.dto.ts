import { IsString } from "class-validator";

export class CreateUserDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}
