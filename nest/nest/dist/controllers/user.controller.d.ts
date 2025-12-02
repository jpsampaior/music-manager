import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';
import { AddPlaylistToUserInput } from '../inputs/add-playlist-to-user.input';
export declare class UserController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findPlaylists(id: number): Promise<any[]>;
    create(input: CreateUserInput): Promise<any>;
    update(id: number, input: Omit<UpdateUserInput, 'id'>): Promise<any>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    addPlaylist(userId: number, input: Omit<AddPlaylistToUserInput, 'userId'>): Promise<{
        success: boolean;
        data: any;
    }>;
    removePlaylist(userId: number, playlistId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
