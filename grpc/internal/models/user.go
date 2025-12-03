package models

type User struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
	Age  int32  `json:"age"`
}

type CreateUserRequest struct {
	Name string `json:"name"`
	Age  int32  `json:"age"`
}

type UpdateUserRequest struct {
	ID   int32   `json:"id"`
	Name *string `json:"name,omitempty"`
	Age  *int32  `json:"age,omitempty"`
}

type UserPlaylist struct {
	UserID     int32 `json:"userId"`
	PlaylistID int32 `json:"playlistId"`
}
