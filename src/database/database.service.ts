import { Injectable } from '@nestjs/common';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';
import { dataSource, pDataSource, pDataSourceOptions } from 'src/typeorm';

@Injectable()
export class DatabaseService {
  async create(req: Request, id: string, name: string) {
    const ds = await pDataSource.initialize();
    ds.query(`CREATE DATABASE ${name}`);
  }
}
