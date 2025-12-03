package models

type Music struct {
	ID     int32  `json:"id"`
	Name   string `json:"name"`
	Artist string `json:"artist"`
}

type CreateMusicRequest struct {
	Name   string `json:"name"`
	Artist string `json:"artist"`
}

type UpdateMusicRequest struct {
	ID     int32   `json:"id"`
	Name   *string `json:"name,omitempty"`
	Artist *string `json:"artist,omitempty"`
}
