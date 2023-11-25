import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    owner: string;

    @Column("int", { default: Math.floor(Date.now() / 1000) })
    created_at: number;
}
