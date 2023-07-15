import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';

@Entity({name: 'users'})
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true, name: 'phone_number'})
    phoneNumber: string;

    @Column({ nullable: true})
    email: string;
}
