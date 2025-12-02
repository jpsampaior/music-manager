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
import { CreateMusicInput } from '../inputs/create-music.input';
import { UpdateMusicInput } from '../inputs/update-music.input';

@Controller('music')
export class MusicController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async findAll() {
    const { data, error } = await this.supabaseService.music.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { data, error } = await this.supabaseService.music
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Get(':id/playlists')
  async findPlaylists(@Param('id', ParseIntPipe) id: number) {
    const { data: playlistMusicData, error: playlistMusicError } =
      await this.supabaseService.playlistMusic
        .select('playlistId')
        .eq('musicId', id);

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

  @Post()
  async create(@Body() input: CreateMusicInput) {
    const { data, error } = await this.supabaseService.music
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdateMusicInput, 'id'>,
  ) {
    const { data, error } = await this.supabaseService.music
      .update(input)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { error } = await this.supabaseService.music.delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Music deleted successfully' };
  }
}

