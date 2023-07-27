import { JwtService } from "@nestjs/jwt";
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import authConfig from "../config/auth.config";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async use(req: Request | any, res: Response, next: () => void) {

    const { body } = req;

    if (body && body.query.includes("signIn")) {
      return next();
    }

    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      return res.status(401).json({ message: 'Não autorizado. Token não fornecido.' });
    }

    let isAdmin: boolean = false;

    try {
      const { secret } = authConfig.jwt;

      const userAuth = this.jwtService.verify(
        accessToken, {
        secret,
      }
      );

      isAdmin = userAuth?.isAdmin;

    } catch (error) {
      throw new ForbiddenException('Não autorizado');
    }

    if (isAdmin) {
      req.userIsAdmin = isAdmin;
    };

    next();

  }
}