import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "User e-mail" })
  email: string;
  @Field(() => String, { description: "User Password" })
  password: string
  @Field(() => Boolean, { description: "Stock of a product" })
  isAdmin: boolean
};