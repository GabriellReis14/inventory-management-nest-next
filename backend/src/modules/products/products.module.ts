import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from '../../database/prisma.service';
import { AuthMiddleware } from 'src/middlewares/auth.middlewares';

@Module({
  providers: [ProductsResolver, ProductsService, PrismaService]
})
export class ProductsModule {}
