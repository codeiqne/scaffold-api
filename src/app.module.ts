import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { dataSourceOptions } from './typeorm';

@Module({
  imports: [
    ProjectModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    Reflector
  ],
  controllers: [AppController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [
  ]
})
export class AppModule {}
