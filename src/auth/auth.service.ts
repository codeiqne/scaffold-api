import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { hash, verify } from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Checks
    let usernameExists = (await this.userRepo.find({ where: { username: createUserDto.username } })).length !== 0;
    if (usernameExists) { throw new ConflictException(`Username '${createUserDto.username}' already exists`); }
    let emailExists = (await this.userRepo.find({ where: { email: createUserDto.email } })).length !== 0;
    if (emailExists) { throw new ConflictException(`An user with email '${createUserDto.email}' already exists`); }

    let dto = createUserDto;
    dto.password = await hash(dto.password);

    await this.userRepo.insert(dto);

    const user = (await this.userRepo.find({ where: { username: createUserDto.username } })).at(0);
    
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    this.tokenRepo.insert({ token: token, user_id: user.id });
    return {
      access_token: token
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const userData = await this.userRepo.find({ where: { email: loginUserDto.email } });
    if (userData.length === 0) { throw new UnauthorizedException("Invalid email and/or password"); }
    const user = userData.at(0);

    if (!(await verify(user.password, loginUserDto.password))) { throw new UnauthorizedException("Invalid email and/or password"); }

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    this.tokenRepo.insert({ token: token, user_id: user.id });
    return {
      access_token: token
    };
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    let user = await this.userRepo.find({ where: { id: id } });
    if (user.length === 0) { throw new NotFoundException(`An user with ID '${id}' does not exist`); }
    return user.at(0);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let userExists = (await this.userRepo.find({ where: { id: id } })).length !== 0;
    if (!userExists) { throw new NotFoundException(`An user with ID'${id}' does not exist`); }

    updateUserDto.password = await hash(updateUserDto.password);

    await this.userRepo.update(id, updateUserDto);

    const user = (await this.userRepo.find({ where: { username: updateUserDto.username } })).at(0);
    return user;
  }

  async remove(id: string) {
    let user = await this.userRepo.find({ where: { id: id } });
    if (user.length === 0) { throw new NotFoundException(`User with ID '${id}' does not exist`); }
    await this.userRepo.remove(user);
    return user;
  }
}
