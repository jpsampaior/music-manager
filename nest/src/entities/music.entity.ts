import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Playlist } from './playlist.entity';

@ObjectType()
export class Music {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  artist: string;

  @Field(() => [Playlist], { nullable: true })
  playlists?: Playlist[];
}

