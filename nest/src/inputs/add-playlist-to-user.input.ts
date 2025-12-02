import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddPlaylistToUserInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  playlistId: number;
}

