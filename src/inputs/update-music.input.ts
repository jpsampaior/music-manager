import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMusicInput } from './create-music.input';

@InputType()
export class UpdateMusicInput extends PartialType(CreateMusicInput) {
  @Field(() => Int)
  id: number;
}

