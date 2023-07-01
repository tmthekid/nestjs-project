import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message: "Name is Requried!"})
    name: String;

}