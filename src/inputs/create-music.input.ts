import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMusicInput {
  @Field()
  name: string;

  @Field()
  artist: string;
}

