import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User ID' })
  id: number;
  @Field(() => String, { description: 'User email' })
  email: string;
  @Field(() => String, { description: 'User password' })
  password: string;
  @Field(() => Boolean, { description: 'User is admin' })
  isAdmin: boolean;
}
