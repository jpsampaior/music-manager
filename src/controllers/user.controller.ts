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
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';
import { AddPlaylistToUserInput } from '../inputs/add-playlist-to-user.input';

@Controller('user')
export class UserController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async findAll() {
    const { data, error } = await this.supabaseService.user.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { data, error } = await this.supabaseService.user
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Get(':id/playlists')
  async findPlaylists(@Param('id', ParseIntPipe) id: number) {
    const { data: userPlaylistData, error: userPlaylistError } =
      await this.supabaseService.userPlaylist
        .select('playlistId')
        .eq('userId', id);

    if (userPlaylistError || !userPlaylistData?.length) {
      return [];
    }

    const playlistIds = userPlaylistData.map((up) => up.playlistId);
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .in('id', playlistIds);

    if (error) throw new Error(error.message);
    return data || [];
  }

  @Post()
  async create(@Body() input: CreateUserInput) {
    const { data, error } = await this.supabaseService.user
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdateUserInput, 'id'>,
  ) {
    const { data, error } = await this.supabaseService.user
      .update(input)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { error } = await this.supabaseService.user.delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'User deleted successfully' };
  }

  @Post(':id/playlist')
  async addPlaylist(
    @Param('id', ParseIntPipe) userId: number,
    @Body() input: Omit<AddPlaylistToUserInput, 'userId'>,
  ) {
    const { data, error } = await this.supabaseService.userPlaylist
      .insert({
        userId,
        playlistId: input.playlistId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { success: true, data };
  }

  @Delete(':id/playlist/:playlistId')
  async removePlaylist(
    @Param('id', ParseIntPipe) userId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    const { error } = await this.supabaseService.userPlaylist
      .delete()
      .eq('userId', userId)
      .eq('playlistId', playlistId);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Playlist removed from user' };
  }
}

