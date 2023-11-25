import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as Uuid4 } from "uuid";

@Entity()
export class ProjectDatabases {
    @PrimaryColumn({ default: Uuid4() })
    id: string;

    @Column()
    name: string;

    @Column()
    project: string;
}