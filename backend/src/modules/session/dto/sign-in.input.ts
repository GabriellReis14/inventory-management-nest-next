import { InputType,  Field } from '@nestjs/graphql';

@InputType()
export class SessionInput {
  @Field(() => String, { description: "User e-mail" })
  email: string;
  @Field(() => String, { description: "User Password" })
  password: string
};