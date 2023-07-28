import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../database/prisma.service';
import {hashSync, hash} from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserInput: CreateUserInput) {
    try {
      const { password, ...rest } = createUserInput;

      const hashPassword = await hash(password, 15);

      const user = await this.prisma.users.create({
        data: {
          password: hashPassword, 
          ...rest
        }
      });

      return user;
    } catch (error) {
      console.log('{create users} - ', error)
    };
  };

  async findAll() {
    const users = await this.prisma.users.findMany();

    return users;
  };

  async findOne(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email
      }
    });

    return user;
  };

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    try {

      const updated = await this.prisma.users.update({
        where: { id },
        data: {
          password: updateUserInput.password || undefined,
          isAdmin: updateUserInput.isAdmin || undefined,
        }
      });

      return updated;
    } catch (error) {
      console.log('{update users} - ', error)
    }
  };

  async removeUser(id: number) {
    try {
      const deleted = await this.prisma.users.delete({
        where: { id }
      });

      return deleted;
    } catch (error) {
      console.log('{remove users} - ', error)
    }
  };
};