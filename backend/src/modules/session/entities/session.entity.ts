import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../../modules/users/entities/user.entity';

@ObjectType()
export class Session {
  @Field(() => String, { description: 'Token' })
  token: String;
  @Field(() => User, { description: 'User' })
  user: User;
}
