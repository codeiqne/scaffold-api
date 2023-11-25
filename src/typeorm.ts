import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Project } from "./entities/project.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: "mariadb",
    host: "scaffold-mariadb",
    port: 3306,
    username: "scaffold",
    password: "scaffold",
    database: "scaffold",
    synchronize: true,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"]
};

export const dataSource = new DataSource(dataSourceOptions);
