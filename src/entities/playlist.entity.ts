import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Music } from './music.entity';
import { User } from './user.entity';

@ObjectType()
export class Playlist {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Music], { nullable: true })
  musics?: Music[];

  @Field(() => [User], { nullable: true })
  users?: User[];
}

