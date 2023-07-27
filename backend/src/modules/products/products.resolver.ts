import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { getErrorProductNotFound } from '../../constants/errors.constants';
import ExtendedRequest from 'src/types/extended-request.interface';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exception';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @Context('req') req: ExtendedRequest,
  ) {
    const userIsAdmin: boolean = req.userIsAdmin;

    if (!userIsAdmin) {
      throw new UnauthorizedException('Acesso negado. Somente administradores podem atualizar produtos.');
    }
    const findProduct = await this.productsService.findOne(updateProductInput.id);

    if (!!!findProduct) {
      throw new Error(getErrorProductNotFound(updateProductInput.id));
    };

    const response: any = this.productsService.update(updateProductInput.id, updateProductInput);

    return response
  }

  @Mutation(() => Product)
  removeProduct(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: ExtendedRequest,
    ) {
    const userIsAdmin: boolean = req.userIsAdmin;

    if (!userIsAdmin) {
      throw new UnauthorizedException('Acesso negado. Somente administradores podem deletar produtos.');
    };

    return this.productsService.remove(id);
  }
}
