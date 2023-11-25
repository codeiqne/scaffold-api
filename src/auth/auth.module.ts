import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Token } from 'src/entities/token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      secret: process.env.SCAFFOLD_JWT_SECRET,
      signOptions: { expiresIn: '31d' },
      global: true
    }),
  ],
  exports: [TypeOrmModule, AuthService, JwtModule]
})
export class AuthModule {}
