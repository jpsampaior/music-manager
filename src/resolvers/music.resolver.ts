import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Music } from '../entities/music.entity';
import { Playlist } from '../entities/playlist.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMusicInput } from '../inputs/create-music.input';
import { UpdateMusicInput } from '../inputs/update-music.input';

@Resolver(() => Music)
export class MusicResolver {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Query(() => [Music], { name: 'musics' })
  async findAll(): Promise<Music[]> {
    const { data, error } = await this.supabaseService.music.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Query(() => Music, { name: 'music', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Music | null> {
    const { data, error } = await this.supabaseService.music
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Music)
  async createMusic(@Args('input') input: CreateMusicInput): Promise<Music> {
    const { data, error } = await this.supabaseService.music
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Music)
  async updateMusic(@Args('input') input: UpdateMusicInput): Promise<Music> {
    const { id, ...updateData } = input;
    const { data, error } = await this.supabaseService.music
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Boolean)
  async removeMusic(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const { error } = await this.supabaseService.music.delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  @ResolveField(() => [Playlist], { nullable: true })
  async playlists(@Parent() music: Music): Promise<Playlist[]> {
    const { data: playlistMusicData, error: playlistMusicError } = 
      await this.supabaseService.playlistMusic
        .select('playlistId')
        .eq('musicId', music.id);

    if (playlistMusicError || !playlistMusicData?.length) {
      return [];
    }

    const playlistIds = playlistMusicData.map((pm) => pm.playlistId);
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .in('id', playlistIds);

    if (error) throw new Error(error.message);
    return data || [];
  }
}

