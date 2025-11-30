import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class MusicSoapService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createSong(args: { name: string; artist: string }) {
    const { data, error } = await this.supabaseService.music
      .insert({ name: args.name, artist: args.artist })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  }

  async getSong(args: { id: number }) {
    const { data, error } = await this.supabaseService.music
      .select('*')
      .eq('id', args.id)
      .single();
    if (error) throw new Error(error.message);
    return { song: data };
  }

  async updateSong(args: { id: number; name: string; artist: string }) {
    const { error } = await this.supabaseService.music
      .update({ name: args.name, artist: args.artist })
      .eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deleteSong(args: { id: number }) {
    const { error } = await this.supabaseService.music
      .delete()
      .eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async listSongs() {
    const { data, error } = await this.supabaseService.music.select('*');
    if (error) throw new Error(error.message);
    return { songs: { item: data || [] } };
  }

  async listSongsByPlaylist(args: { playlist_id: number }) {
    const { data: playlistMusicData, error: playlistMusicError } =
      await this.supabaseService.playlistMusic
        .select('musicId')
        .eq('playlistId', args.playlist_id);

    if (playlistMusicError || !playlistMusicData?.length) {
      return { songs: { item: [] } };
    }

    const musicIds = playlistMusicData.map((pm) => pm.musicId);
    const { data, error } = await this.supabaseService.music
      .select('*')
      .in('id', musicIds);

    if (error) throw new Error(error.message);
    return { songs: { item: data || [] } };
  }
}
