import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Playlist } from '../entities/playlist.entity';
import { Music } from '../entities/music.entity';
import { User } from '../entities/user.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePlaylistInput } from '../inputs/create-playlist.input';
import { UpdatePlaylistInput } from '../inputs/update-playlist.input';
import { AddMusicToPlaylistInput } from '../inputs/add-music-to-playlist.input';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Query(() => [Playlist], { name: 'playlists' })
  async findAll(): Promise<Playlist[]> {
    const { data, error } = await this.supabaseService.playlist.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Query(() => Playlist, { name: 'playlist', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Playlist | null> {
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Query(() => [Playlist], { name: 'playlistsByMusic' })
  async findPlaylistsByMusic(@Args('musicId', { type: () => Int }) musicId: number): Promise<Playlist[]> {
    const { data: playlistMusicData, error: playlistMusicError } = 
      await this.supabaseService.playlistMusic
        .select('playlistId')
        .eq('musicId', musicId);

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

  @Mutation(() => Playlist)
  async createPlaylist(@Args('input') input: CreatePlaylistInput): Promise<Playlist> {
    const { data, error } = await this.supabaseService.playlist
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Playlist)
  async updatePlaylist(@Args('input') input: UpdatePlaylistInput): Promise<Playlist> {
    const { id, ...updateData } = input;
    const { data, error } = await this.supabaseService.playlist
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Boolean)
  async removePlaylist(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const { error } = await this.supabaseService.playlist.delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  @Mutation(() => Boolean)
  async addMusicToPlaylist(@Args('input') input: AddMusicToPlaylistInput): Promise<boolean> {
    const { data, error } = await this.supabaseService.playlistMusic
      .insert({
        playlistId: input.playlistId,
        musicId: input.musicId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return !!data;
  }

  @Mutation(() => Boolean)
  async removeMusicFromPlaylist(
    @Args('playlistId', { type: () => Int }) playlistId: number,
    @Args('musicId', { type: () => Int }) musicId: number,
  ): Promise<boolean> {
    const { error } = await this.supabaseService.playlistMusic
      .delete()
      .eq('playlistId', playlistId)
      .eq('musicId', musicId);
    if (error) throw new Error(error.message);
    return true;
  }

  @ResolveField(() => [Music], { nullable: true })
  async musics(@Parent() playlist: Playlist): Promise<Music[]> {
    const { data: playlistMusicData, error: playlistMusicError } = 
      await this.supabaseService.playlistMusic
        .select('musicId')
        .eq('playlistId', playlist.id);

    if (playlistMusicError || !playlistMusicData?.length) {
      return [];
    }

    const musicIds = playlistMusicData.map((pm) => pm.musicId);
    const { data, error } = await this.supabaseService.music
      .select('*')
      .in('id', musicIds);

    if (error) throw new Error(error.message);
    return data || [];
  }

  @ResolveField(() => [User], { nullable: true })
  async users(@Parent() playlist: Playlist): Promise<User[]> {
    const { data: userPlaylistData, error: userPlaylistError } = 
      await this.supabaseService.userPlaylist
        .select('userId')
        .eq('playlistId', playlist.id);

    if (userPlaylistError || !userPlaylistData?.length) {
      return [];
    }

    const userIds = userPlaylistData.map((up) => up.userId);
    const { data, error } = await this.supabaseService.user
      .select('*')
      .in('id', userIds);

    if (error) throw new Error(error.message);
    return data || [];
  }
}

