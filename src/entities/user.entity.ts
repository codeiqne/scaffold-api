import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as UuidV4 } from 'uuid';

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
};

@Entity()
export class User {
    @PrimaryColumn({ default: UuidV4() })
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;
}
