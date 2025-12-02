import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePlaylistInput } from '../inputs/create-playlist.input';
import { UpdatePlaylistInput } from '../inputs/update-playlist.input';
import { AddMusicToPlaylistInput } from '../inputs/add-music-to-playlist.input';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async findAll() {
    const { data, error } = await this.supabaseService.playlist.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Get(':id/musics')
  async findMusics(@Param('id', ParseIntPipe) id: number) {
    const { data: playlistMusicData, error: playlistMusicError } =
      await this.supabaseService.playlistMusic
        .select('musicId')
        .eq('playlistId', id);

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

  @Get(':id/users')
  async findUsers(@Param('id', ParseIntPipe) id: number) {
    const { data: userPlaylistData, error: userPlaylistError } =
      await this.supabaseService.userPlaylist
        .select('userId')
        .eq('playlistId', id);

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

  @Post()
  async create(@Body() input: CreatePlaylistInput) {
    const { data, error } = await this.supabaseService.playlist
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdatePlaylistInput, 'id'>,
  ) {
    const { data, error } = await this.supabaseService.playlist
      .update(input)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { error } = await this.supabaseService.playlist
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Playlist deleted successfully' };
  }

  @Post(':id/music')
  async addMusic(
    @Param('id', ParseIntPipe) playlistId: number,
    @Body() input: Omit<AddMusicToPlaylistInput, 'playlistId'>,
  ) {
    const { data, error } = await this.supabaseService.playlistMusic
      .insert({
        playlistId,
        musicId: input.musicId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  }

  @Delete(':id/music/:musicId')
  async removeMusic(
    @Param('id', ParseIntPipe) playlistId: number,
    @Param('musicId', ParseIntPipe) musicId: number,
  ) {
    const { error } = await this.supabaseService.playlistMusic
      .delete()
      .eq('playlistId', playlistId)
      .eq('musicId', musicId);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Music removed from playlist' };
  }
}

