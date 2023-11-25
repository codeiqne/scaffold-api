import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { User } from 'src/entities/user.entity';
import { ProjectDatabases } from 'src/entities/projectDatabases.entity';
import { pDataSourceOptions } from 'src/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Token } from 'src/entities/token.entity';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, AuthGuard],
  imports: [TypeOrmModule.forFeature([Project, User, Token, ProjectDatabases])],
  exports: [TypeOrmModule]
})
export class ProjectModule {} 
