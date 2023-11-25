import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post(":id/:name")
  async create(@Request() req: Request, @Param("id") id: string, @Param("name") name: string) {
    this.databaseService.create(req, id, name);
  }
}
