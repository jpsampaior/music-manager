import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Playlist } from './playlist.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => [Playlist], { nullable: true })
  playlists?: Playlist[];
}

