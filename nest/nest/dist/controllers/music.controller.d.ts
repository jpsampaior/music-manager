import { SupabaseService } from '../supabase/supabase.service';
import { CreateMusicInput } from '../inputs/create-music.input';
import { UpdateMusicInput } from '../inputs/update-music.input';
export declare class MusicController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findPlaylists(id: number): Promise<any[]>;
    create(input: CreateMusicInput): Promise<any>;
    update(id: number, input: Omit<UpdateMusicInput, 'id'>): Promise<any>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
