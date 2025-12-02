import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL and Key must be provided in environment variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Métodos auxiliares para as tabelas
  get music() {
    return this.supabase.from('music');
  }

  get playlist() {
    return this.supabase.from('playlist');
  }

  get user() {
    return this.supabase.from('user');
  }

  get playlistMusic() {
    return this.supabase.from('playlist_music');
  }

  get userPlaylist() {
    return this.supabase.from('user_playlist');
  }
}

