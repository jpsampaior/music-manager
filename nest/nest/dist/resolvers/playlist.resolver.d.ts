import { Playlist } from '../entities/playlist.entity';
import { Music } from '../entities/music.entity';
import { User } from '../entities/user.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePlaylistInput } from '../inputs/create-playlist.input';
import { UpdatePlaylistInput } from '../inputs/update-playlist.input';
import { AddMusicToPlaylistInput } from '../inputs/add-music-to-playlist.input';
export declare class PlaylistResolver {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<Playlist[]>;
    findOne(id: number): Promise<Playlist | null>;
    findPlaylistsByMusic(musicId: number): Promise<Playlist[]>;
    createPlaylist(input: CreatePlaylistInput): Promise<Playlist>;
    updatePlaylist(input: UpdatePlaylistInput): Promise<Playlist>;
    removePlaylist(id: number): Promise<boolean>;
    addMusicToPlaylist(input: AddMusicToPlaylistInput): Promise<boolean>;
    removeMusicFromPlaylist(playlistId: number, musicId: number): Promise<boolean>;
    musics(playlist: Playlist): Promise<Music[]>;
    users(playlist: Playlist): Promise<User[]>;
}
