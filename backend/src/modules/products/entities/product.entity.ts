import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int, { description: 'ID' })
  id: number;
  @Field(() => String, { description: 'Description' })
  description: string;
  @Field(() => Int, { description: 'Stock' })
  stock: number;
}
