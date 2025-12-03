package soap

import (
	"encoding/xml"
	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
)

type UserSOAPHandler struct {
	supabase *db.SupabaseService
}

func NewUserSOAPHandler(supabase *db.SupabaseService) *UserSOAPHandler {
	return &UserSOAPHandler{
		supabase: supabase,
	}
}

// FindAll
type FindAllUsersRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user FindAllUsersRequest"`
}

type FindAllUsersResponse struct {
	XMLName xml.Name   `xml:"http://music.soap.manager/user FindAllUsersResponse"`
	Users   []UserSOAP `xml:"users"`
}

// FindOne
type FindOneUserRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user FindOneUserRequest"`
	ID      int32    `xml:"id"`
}

type FindOneUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user FindOneUserResponse"`
	User    UserSOAP `xml:"user"`
}

// FindPlaylists
type FindPlaylistsOfUserRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user FindPlaylistsOfUserRequest"`
	ID      int32    `xml:"id"`
}

type FindPlaylistsOfUserResponse struct {
	XMLName   xml.Name       `xml:"http://music.soap.manager/user FindPlaylistsOfUserResponse"`
	Playlists []PlaylistSOAP `xml:"playlists"`
}

// Create
type CreateUserRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user CreateUserRequest"`
	Name    string   `xml:"name"`
	Age     int32    `xml:"age"`
}

type CreateUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user CreateUserResponse"`
	User    UserSOAP `xml:"user"`
}

// Update
type UpdateUserRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user UpdateUserRequest"`
	ID      int32    `xml:"id"`
	Name    *string  `xml:"name,omitempty"`
	Age     *int32   `xml:"age,omitempty"`
}

type UpdateUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user UpdateUserResponse"`
	User    UserSOAP `xml:"user"`
}

// Delete
type DeleteUserRequest struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user DeleteUserRequest"`
	ID      int32    `xml:"id"`
}

type DeleteUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user DeleteUserResponse"`
	Success bool     `xml:"success"`
	Message string   `xml:"message"`
}

// AddPlaylist
type AddPlaylistToUserRequest struct {
	XMLName    xml.Name `xml:"http://music.soap.manager/user AddPlaylistToUserRequest"`
	UserID     int32    `xml:"userId"`
	PlaylistID int32    `xml:"playlistId"`
}

type AddPlaylistToUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user AddPlaylistToUserResponse"`
	Success bool     `xml:"success"`
	Data    PlaylistToUserData `xml:"data"`
}

type PlaylistToUserData struct {
	UserID     int32 `xml:"userId"`
	PlaylistID int32 `xml:"playlistId"`
}

// RemovePlaylist
type RemovePlaylistFromUserRequest struct {
	XMLName    xml.Name `xml:"http://music.soap.manager/user RemovePlaylistFromUserRequest"`
	UserID     int32    `xml:"userId"`
	PlaylistID int32    `xml:"playlistId"`
}

type RemovePlaylistFromUserResponse struct {
	XMLName xml.Name `xml:"http://music.soap.manager/user RemovePlaylistFromUserResponse"`
	Success bool     `xml:"success"`
	Message string   `xml:"message"`
}

func (h *UserSOAPHandler) FindAll(req *FindAllUsersRequest) (*FindAllUsersResponse, *SOAPFault) {
	users, err := h.supabase.FindAllUsers(nil)
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

	return &FindAllUsersResponse{Users: soapUsers}, nil
}

func (h *UserSOAPHandler) FindOne(req *FindOneUserRequest) (*FindOneUserResponse, *SOAPFault) {
	user, err := h.supabase.FindUserByID(nil, req.ID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &FindOneUserResponse{
		User: UserSOAP{
			ID:   user.ID,
			Name: user.Name,
			Age:  user.Age,
		},
	}, nil
}

func (h *UserSOAPHandler) FindPlaylists(req *FindPlaylistsOfUserRequest) (*FindPlaylistsOfUserResponse, *SOAPFault) {
	playlists, err := h.supabase.FindPlaylistsByUserID(nil, req.ID)
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

	return &FindPlaylistsOfUserResponse{Playlists: soapPlaylists}, nil
}

func (h *UserSOAPHandler) Create(req *CreateUserRequest) (*CreateUserResponse, *SOAPFault) {
	createReq := &models.CreateUserRequest{
		Name: req.Name,
		Age:  req.Age,
	}

	user, err := h.supabase.CreateUser(nil, createReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &CreateUserResponse{
		User: UserSOAP{
			ID:   user.ID,
			Name: user.Name,
			Age:  user.Age,
		},
	}, nil
}

func (h *UserSOAPHandler) Update(req *UpdateUserRequest) (*UpdateUserResponse, *SOAPFault) {
	updateReq := &models.UpdateUserRequest{
		ID:   req.ID,
		Name: req.Name,
		Age:  req.Age,
	}

	user, err := h.supabase.UpdateUser(nil, updateReq)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &UpdateUserResponse{
		User: UserSOAP{
			ID:   user.ID,
			Name: user.Name,
			Age:  user.Age,
		},
	}, nil
}

func (h *UserSOAPHandler) Delete(req *DeleteUserRequest) (*DeleteUserResponse, *SOAPFault) {
	err := h.supabase.DeleteUser(nil, req.ID)
	if err != nil {
		return &DeleteUserResponse{
			Success: false,
			Message: err.Error(),
		}, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &DeleteUserResponse{
		Success: true,
		Message: "User deleted successfully",
	}, nil
}

func (h *UserSOAPHandler) AddPlaylist(req *AddPlaylistToUserRequest) (*AddPlaylistToUserResponse, *SOAPFault) {
	err := h.supabase.AddPlaylistToUser(nil, req.UserID, req.PlaylistID)
	if err != nil {
		return nil, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &AddPlaylistToUserResponse{
		Success: true,
		Data: PlaylistToUserData{
			UserID:     req.UserID,
			PlaylistID: req.PlaylistID,
		},
	}, nil
}

func (h *UserSOAPHandler) RemovePlaylist(req *RemovePlaylistFromUserRequest) (*RemovePlaylistFromUserResponse, *SOAPFault) {
	err := h.supabase.RemovePlaylistFromUser(nil, req.UserID, req.PlaylistID)
	if err != nil {
		return &RemovePlaylistFromUserResponse{
			Success: false,
			Message: err.Error(),
		}, &SOAPFault{
			FaultCode:   "Server",
			FaultString: err.Error(),
		}
	}

	return &RemovePlaylistFromUserResponse{
		Success: true,
		Message: "Playlist removed from user",
	}, nil
}
