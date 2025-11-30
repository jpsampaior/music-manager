import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PlaylistSoapService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createPlaylist(args: { name: string }) {
    const { data, error } = await this.supabaseService.playlist
      .insert({ name: args.name })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  }

  async getPlaylist(args: { id: number }) {
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .eq('id', args.id)
      .single();
    if (error) throw new Error(error.message);
    return { playlist: data };
  }

  async updatePlaylist(args: { id: number; name: string }) {
    const { error } = await this.supabaseService.playlist
      .update({ name: args.name })
      .eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deletePlaylist(args: { id: number }) {
    const { error } = await this.supabaseService.playlist
      .delete()
      .eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async listPlaylists() {
    const { data, error } = await this.supabaseService.playlist.select('*');
    if (error) throw new Error(error.message);
    return { playlists: { item: data || [] } };
  }

  async addSongsToPlaylist(args: { playlist_id: number; song_ids: string }) {
    try {
      // Parse song IDs from comma-separated string
      const songIds = args.song_ids.split(',').map((id) => parseInt(id.trim()));

      // Insert all relationships
      const insertData = songIds.map((musicId) => ({
        playlistId: args.playlist_id,
        musicId,
      }));

      const { error } = await this.supabaseService.playlistMusic.insert(
        insertData,
      );

      if (error) throw new Error(error.message);
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeSongsFromPlaylist(args: {
    playlist_id: number;
    song_ids: string;
  }) {
    try {
      // Parse song IDs from comma-separated string
      const songIds = args.song_ids.split(',').map((id) => parseInt(id.trim()));

      // Delete all relationships
      const { error } = await this.supabaseService.playlistMusic
        .delete()
        .eq('playlistId', args.playlist_id)
        .in('musicId', songIds);

      if (error) throw new Error(error.message);
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async listPlaylistsBySong(args: { song_id: number }) {
    const { data: playlistMusicData, error: playlistMusicError } =
      await this.supabaseService.playlistMusic
        .select('playlistId')
        .eq('musicId', args.song_id);

    if (playlistMusicError || !playlistMusicData?.length) {
      return { playlists: { item: [] } };
    }

    const playlistIds = playlistMusicData.map((pm) => pm.playlistId);
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .in('id', playlistIds);

    if (error) throw new Error(error.message);
    return { playlists: { item: data || [] } };
  }
}
