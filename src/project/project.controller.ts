import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(req, createProjectDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectService.findAll(req);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectService.findOne(req, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(req, id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.projectService.remove(req, id);
  }



/* 
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │   PROJECT SPECIFIC                                                          │
  ├─────────────────────────────────────────────────────────────────────────────┤
  │   Databases                                                                 │
  └─────────────────────────────────────────────────────────────────────────────┘
 */
  @Get(':id/database')
  databaseList(@Request() req, @Param('id') id: string) {
    // return this.databaseService.getAll(this.projectService, req, id);
  }

  @Get(':id/database/:did')
  databaseGet(@Request() req, @Param('id') id: string, @Param('did') databaseId: string) {
    // return this.databaseService.getOne(this.projectService, req, id, databaseId);
  }

}
