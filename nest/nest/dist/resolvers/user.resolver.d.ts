import { User } from '../entities/user.entity';
import { Playlist } from '../entities/playlist.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';
import { AddPlaylistToUserInput } from '../inputs/add-playlist-to-user.input';
export declare class UserResolver {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    createUser(input: CreateUserInput): Promise<User>;
    updateUser(input: UpdateUserInput): Promise<User>;
    removeUser(id: number): Promise<boolean>;
    addPlaylistToUser(input: AddPlaylistToUserInput): Promise<boolean>;
    removePlaylistFromUser(userId: number, playlistId: number): Promise<boolean>;
    playlists(user: User): Promise<Playlist[]>;
}
