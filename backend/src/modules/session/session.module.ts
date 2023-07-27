import { Module } from '@nestjs/common';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SessionResolver, SessionService, PrismaService, UsersService, JwtService]
})
export class SessionModule {}
