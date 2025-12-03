import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private readonly configService;
    private readonly supabase;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient;
    get music(): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, "music", unknown>;
    get playlist(): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, "playlist", unknown>;
    get user(): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, "user", unknown>;
    get playlistMusic(): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, "playlist_music", unknown>;
    get userPlaylist(): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, "user_playlist", unknown>;
}
