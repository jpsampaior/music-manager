import { Playlist } from './playlist.entity';
export declare class User {
    id: number;
    name: string;
    age: number;
    playlists?: Playlist[];
}
