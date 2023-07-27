import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import authConfig from '../../config/auth.config';

@Injectable()
export class SessionService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new Error("Email ou senha inválidos!");
    };

    const passwordDecrypt: boolean = compareSync(password, user.password);

    if (!passwordDecrypt) {
      throw new Error("Email ou senha inválidos!");
    };

    const { secret, expiresIn } = authConfig.jwt;

    const token = this.jwtService.sign({
      isAdmin: user.isAdmin
    }, {
      secret,
      expiresIn
    });

    return {
      token,
      user
    }
  };
};