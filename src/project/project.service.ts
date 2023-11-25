import { BadRequestException, ConflictException, Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { v4 as UuidV4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ProjectDatabases } from 'src/entities/projectDatabases.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(ProjectDatabases) private pDatabaseRepo: Repository<ProjectDatabases>,
  ) {}

  async create(req: Request, createProjectDto: CreateProjectDto) {
    let exists = (await this.projectRepo.find({ where: { id: createProjectDto.id } })).length !== 0;
    if (exists) { throw new ConflictException(`Project with ID '${createProjectDto.id}' already exists`); }
    let name = createProjectDto.name;
    let id = createProjectDto.id || UuidV4();
    let owner = req["user"].id;
    let project = { name: name, id: id, owner: owner };
    await this.projectRepo.insert(project);
    return project;
  }

  async findAll(req: Request) {
    return await this.projectRepo.find({ where: { owner: req['user'].id } });
  }

  async findOne(req: Request, id: string) {
    const project = await this.projectRepo.find({ where: { id: id, owner: req['user'].id } });
    if (project.length == 0) { throw new NotFoundException(`Project with ID ${id} not found`); }
    return project;
  }

  async update(req: Request, id: string, updateProjectDto: UpdateProjectDto) {
    let target = await this.projectRepo.find({ where: { id: id, owner: req['user'].id } });
    if (target.length == 0) { throw new NotFoundException(`Project with ID '${id}' does not exist`); }
    if (updateProjectDto.id) {
      const newIdExists = await this.projectRepo.find({ where: { id: updateProjectDto.id } });
      if (newIdExists.length != 0) { throw new BadRequestException(`A project with ID '${updateProjectDto.id}' already exists`); }
    }
    if (updateProjectDto.owner) {
      const newOwnerExists = await this.userRepo.find({ where: { id: updateProjectDto.owner } });
      if (newOwnerExists.length == 0) { throw new BadRequestException("Target owner not found"); }
    }
    await this.projectRepo.update(id, updateProjectDto);
    if (updateProjectDto.owner && updateProjectDto.owner != req['user'].id) {
      return { message: `Project moved to user with ID ${updateProjectDto.owner}` };
    }
    return this.projectRepo.find({ where: { id: id, owner: req['user'].id } });
  }

  async remove(req: Request, id: string) {
    let project = await this.projectRepo.find({ where: { id: id } });
    if (project.length === 0) { throw new NotFoundException(`Project with ID '${id}' does not exist`); }
    await this.projectRepo.remove(project);
    return project
  }
}
