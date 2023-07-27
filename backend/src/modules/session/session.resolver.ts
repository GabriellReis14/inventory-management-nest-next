import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { SessionInput } from './dto/sign-in.input';
import { Session } from './entities/session.entity';


@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) { }

  @Mutation(() => Session)
  signIn(@Args('sessionInput') sessionInput: SessionInput) {
    return this.sessionService.signIn(sessionInput.email, sessionInput.password);
  }
}
