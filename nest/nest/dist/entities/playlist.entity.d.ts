import { Music } from './music.entity';
import { User } from './user.entity';
export declare class Playlist {
    id: number;
    name: string;
    musics?: Music[];
    users?: User[];
}
