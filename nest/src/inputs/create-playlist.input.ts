import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {
  @Field()
  name: string;
}

