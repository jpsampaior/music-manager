package models

type Playlist struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
}

type CreatePlaylistRequest struct {
	Name string `json:"name"`
}

type UpdatePlaylistRequest struct {
	ID   int32   `json:"id"`
	Name *string `json:"name,omitempty"`
}

type PlaylistMusic struct {
	PlaylistID int32 `json:"playlistId"`
	MusicID    int32 `json:"musicId"`
}
