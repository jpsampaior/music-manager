import { Playlist } from './playlist.entity';
export declare class Music {
    id: number;
    name: string;
    artist: string;
    playlists?: Playlist[];
}
