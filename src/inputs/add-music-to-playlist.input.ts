import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddMusicToPlaylistInput {
  @Field(() => Int)
  playlistId: number;

  @Field(() => Int)
  musicId: number;
}

