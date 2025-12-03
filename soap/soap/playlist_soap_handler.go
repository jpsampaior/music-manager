package soap

import (
	"encoding/xml"
	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
)

type PlaylistSOAPHandler struct {
	supabase *db.SupabaseService
}

func NewPlaylistSOAPHandler(supabase *db.SupabaseService) *PlaylistSOAPHandler {
	return &PlaylistSOAPHandler{
		supabase: supabase,
	}
}

// Playlist data type
type PlaylistSOAP struct {
	ID   int32  `xml:"id"`
	Name string `xml:"name"`
}

type UserSOAP struct {
	ID   int32  `xml:"id"`
	Name string `xml:"name"`
	Age  int32  `xml:"age"`
}

// FindAll
type FindAllPlaylistsRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist FindAllPlaylistsRequest"`
}

type FindAllPlaylistsResponse struct {
	XMLName   xml.Name       `xml:"http://music.soap.manager/playlist FindAllPlaylistsResponse"`
	Playlists []PlaylistSOAP `xml:"playlists"`
}

// FindOne
type FindOnePlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist FindOnePlaylistRequest"`
	ID      int32    `xml:"id"`
}

type FindOnePlaylistResponse struct {
	XMLName  xml.Name     `xml:"http://music.soap.manager/playlist FindOnePlaylistResponse"`
	Playlist PlaylistSOAP `xml:"playlist"`
}

// FindMusics
type FindMusicsInPlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist FindMusicsInPlaylistRequest"`
	ID      int32    `xml:"id"`
}

type FindMusicsInPlaylistResponse struct {
	XMLName xml.Name    `xml:"http://music.soap.manager/playlist FindMusicsInPlaylistResponse"`
	Musics  []MusicSOAP `xml:"musics"`
}

// FindUsers
type FindUsersOfPlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist FindUsersOfPlaylistRequest"`
	ID      int32    `xml:"id"`
}

type FindUsersOfPlaylistResponse struct {
	XMLName xml.Name   `xml:"http://music.soap.manager/playlist FindUsersOfPlaylistResponse"`
	Users   []UserSOAP `xml:"users"`
}

// Create
type CreatePlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist CreatePlaylistRequest"`
	Name    string   `xml:"name"`
}

type CreatePlaylistResponse struct {
	XMLName  xml.Name     `xml:"http://music.soap.manager/playlist CreatePlaylistResponse"`
	Playlist PlaylistSOAP `xml:"playlist"`
}

// Update
type UpdatePlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist UpdatePlaylistRequest"`
	ID      int32    `xml:"id"`
	Name    *string  `xml:"name,omitempty"`
}

type UpdatePlaylistResponse struct {
	XMLName  xml.Name     `xml:"http://music.soap.manager/playlist UpdatePlaylistResponse"`
	Playlist PlaylistSOAP `xml:"playlist"`
}

// Delete
type DeletePlaylistRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist DeletePlaylistRequest"`
	ID      int32    `xml:"id"`
}

type DeletePlaylistResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist DeletePlaylistResponse"`
	Success bool     `xml:"success"`
	Message string   `xml:"message"`
}

// AddMusic
type AddMusicToPlaylistRequest struct {
	XMLName    xml.Name `xml:"http://music.soap.manager/playlist AddMusicToPlaylistRequest"`
	PlaylistID int32    `xml:"playlistId"`
	MusicID    int32    `xml:"musicId"`
}

type AddMusicToPlaylistResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist AddMusicToPlaylistResponse"`
	Success bool     `xml:"success"`
	Data    MusicToPlaylistData `xml:"data"`
}

type MusicToPlaylistData struct {
	PlaylistID int32 `xml:"playlistId"`
	MusicID    int32 `xml:"musicId"`
}

// RemoveMusic
type RemoveMusicFromPlaylistRequest struct {
	XMLName    xml.Name `xml:"http://music.soap.manager/playlist RemoveMusicFromPlaylistRequest"`
	PlaylistID int32    `xml:"playlistId"`
	MusicID    int32    `xml:"musicId"`
}

type RemoveMusicFromPlaylistResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/playlist RemoveMusicFromPlaylistResponse"`
	Success bool     `xml:"success"`
	Message string   `xml:"message"`
}

func (h *PlaylistSOAPHandler) FindAll(req *FindAllPlaylistsRequest) (*FindAllPlaylistsResponse, *SOAPFault) {
	playlists, err := h.supabase.FindAllPlaylists(nil)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	soapPlaylists := make([]PlaylistSOAP, len(playlists))
	for i, playlist := range playlists {
		soapPlaylists[i] = PlaylistSOAP{
			ID:   playlist.ID,
			Name: playlist.Name,
		}
	}

	return &FindAllPlaylistsResponse{Playlists: soapPlaylists}, nil
}

func (h *PlaylistSOAPHandler) FindOne(req *FindOnePlaylistRequest) (*FindOnePlaylistResponse, *SOAPFault) {
	playlist, err := h.supabase.FindPlaylistByID(nil, req.ID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &FindOnePlaylistResponse{
		Playlist: PlaylistSOAP{
			ID:   playlist.ID,
			Name: playlist.Name,
		},
	}, nil
}

func (h *PlaylistSOAPHandler) FindMusics(req *FindMusicsInPlaylistRequest) (*FindMusicsInPlaylistResponse, *SOAPFault) {
	musics, err := h.supabase.FindMusicsByPlaylistID(nil, req.ID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	soapMusics := make([]MusicSOAP, len(musics))
	for i, music := range musics {
		soapMusics[i] = MusicSOAP{
			ID:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		}
	}

	return &FindMusicsInPlaylistResponse{Musics: soapMusics}, nil
}

func (h *PlaylistSOAPHandler) FindUsers(req *FindUsersOfPlaylistRequest) (*FindUsersOfPlaylistResponse, *SOAPFault) {
	users, err := h.supabase.FindUsersByPlaylistID(nil, req.ID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	soapUsers := make([]UserSOAP, len(users))
	for i, user := range users {
		soapUsers[i] = UserSOAP{
			ID:   user.ID,
			Name: user.Name,
			Age:  user.Age,
		}
	}

	return &FindUsersOfPlaylistResponse{Users: soapUsers}, nil
}

func (h *PlaylistSOAPHandler) Create(req *CreatePlaylistRequest) (*CreatePlaylistResponse, *SOAPFault) {
	createReq := &models.CreatePlaylistRequest{
		Name: req.Name,
	}

	playlist, err := h.supabase.CreatePlaylist(nil, createReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &CreatePlaylistResponse{
		Playlist: PlaylistSOAP{
			ID:   playlist.ID,
			Name: playlist.Name,
		},
	}, nil
}

func (h *PlaylistSOAPHandler) Update(req *UpdatePlaylistRequest) (*UpdatePlaylistResponse, *SOAPFault) {
	updateReq := &models.UpdatePlaylistRequest{
		ID:   req.ID,
		Name: req.Name,
	}

	playlist, err := h.supabase.UpdatePlaylist(nil, updateReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &UpdatePlaylistResponse{
		Playlist: PlaylistSOAP{
			ID:   playlist.ID,
			Name: playlist.Name,
		},
	}, nil
}

func (h *PlaylistSOAPHandler) Delete(req *DeletePlaylistRequest) (*DeletePlaylistResponse, *SOAPFault) {
	err := h.supabase.DeletePlaylist(nil, req.ID)
	if err != nil {
		return &DeletePlaylistResponse{
			Success: false,
			Message: err.Error(),
		}, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &DeletePlaylistResponse{
		Success: true,
		Message: "Playlist deleted successfully",
	}, nil
}

func (h *PlaylistSOAPHandler) AddMusic(req *AddMusicToPlaylistRequest) (*AddMusicToPlaylistResponse, *SOAPFault) {
	err := h.supabase.AddMusicToPlaylist(nil, req.PlaylistID, req.MusicID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &AddMusicToPlaylistResponse{
		Success: true,
		Data: MusicToPlaylistData{
			PlaylistID: req.PlaylistID,
			MusicID:    req.MusicID,
		},
	}, nil
}

func (h *PlaylistSOAPHandler) RemoveMusic(req *RemoveMusicFromPlaylistRequest) (*RemoveMusicFromPlaylistResponse, *SOAPFault) {
	err := h.supabase.RemoveMusicFromPlaylist(nil, req.PlaylistID, req.MusicID)
	if err != nil {
		return &RemoveMusicFromPlaylistResponse{
			Success: false,
			Message: err.Error(),
		}, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &RemoveMusicFromPlaylistResponse{
		Success: true,
		Message: "Music removed from playlist",
	}, nil
}
