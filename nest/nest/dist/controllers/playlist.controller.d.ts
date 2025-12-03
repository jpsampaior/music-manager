import { SupabaseService } from '../supabase/supabase.service';
import { CreatePlaylistInput } from '../inputs/create-playlist.input';
import { UpdatePlaylistInput } from '../inputs/update-playlist.input';
import { AddMusicToPlaylistInput } from '../inputs/add-music-to-playlist.input';
export declare class PlaylistController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findMusics(id: number): Promise<any[]>;
    findUsers(id: number): Promise<any[]>;
    create(input: CreatePlaylistInput): Promise<any>;
    update(id: number, input: Omit<UpdatePlaylistInput, 'id'>): Promise<any>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    addMusic(playlistId: number, input: Omit<AddMusicToPlaylistInput, 'playlistId'>): Promise<{
        success: boolean;
        data: any;
    }>;
    removeMusic(playlistId: number, musicId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
