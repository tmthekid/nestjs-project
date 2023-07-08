import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    
    @PrimaryColumn()
    id: number;

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