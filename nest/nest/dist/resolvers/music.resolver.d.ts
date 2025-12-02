import { Music } from '../entities/music.entity';
import { Playlist } from '../entities/playlist.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMusicInput } from '../inputs/create-music.input';
import { UpdateMusicInput } from '../inputs/update-music.input';
export declare class MusicResolver {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<Music[]>;
    findOne(id: number): Promise<Music | null>;
    createMusic(input: CreateMusicInput): Promise<Music>;
    updateMusic(input: UpdateMusicInput): Promise<Music>;
    removeMusic(id: number): Promise<boolean>;
    playlists(music: Music): Promise<Playlist[]>;
}
