import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: "Product description" })
  description: string;
  @Field(() => Int, { description: "Product stock." })
  stock: number;
};