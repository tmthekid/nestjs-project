import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    id: number;

    @Expose()
    username: string;

    password: string;

    firstName: string;

    lastName: string;

    phoneNumber: string;

    email: string;
}
