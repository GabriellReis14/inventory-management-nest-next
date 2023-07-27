import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductInput: CreateProductInput) {
    try {
      const product = await this.prisma.products.create({
        data: createProductInput
      });

      return product;
    } catch (error) {
      console.log('{create products} - ', error)
    }

  }

  async findAll() {
    const products = await this.prisma.products.findMany();

    return products;
  }

  async findOne(id: number) {
    const product = await this?.prisma?.products?.findUnique({
      where: {
        id
      }
    });

    return product;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
  
      const updated = await this.prisma.products.update({
        where: { id },
        data: {
          description: updateProductInput.description || undefined,
          stock: updateProductInput.stock || undefined
        }
      });

      return updated;
    } catch (error) {
      console.log('{update products} - ', error)
    }

  }

  async remove(id: number) {
    try {
      const deleted = await this.prisma.products.delete({
        where: { id }
      });

      return deleted;
    } catch (error) {
      console.log('{remove products} - ', error)
    }

  }
}
