package handlers

import (
	"context"

	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
	pb "music-manager-go/proto/user"
)

type UserServiceServer struct {
	pb.UnimplementedUserServiceServer
	supabase *db.SupabaseService
}

func NewUserServiceServer(supabase *db.SupabaseService) *UserServiceServer {
	return &UserServiceServer{
		supabase: supabase,
	}
}

func (s *UserServiceServer) FindAll(ctx context.Context, req *pb.Empty) (*pb.UserList, error) {
	users, err := s.supabase.FindAllUsers(ctx)
	if err != nil {
		return nil, err
	}

	pbUsers := make([]*pb.User, len(users))
	for i, user := range users {
		pbUsers[i] = &pb.User{
			Id:   user.ID,
			Name: user.Name,
			Age:  user.Age,
		}
	}

	return &pb.UserList{Users: pbUsers}, nil
}

func (s *UserServiceServer) FindOne(ctx context.Context, req *pb.UserById) (*pb.User, error) {
	user, err := s.supabase.FindUserByID(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &pb.User{
		Id:   user.ID,
		Name: user.Name,
		Age:  user.Age,
	}, nil
}

func (s *UserServiceServer) FindPlaylists(ctx context.Context, req *pb.UserById) (*pb.PlaylistList, error) {
	playlists, err := s.supabase.FindPlaylistsByUserID(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	pbPlaylists := make([]*pb.Playlist, len(playlists))
	for i, playlist := range playlists {
		pbPlaylists[i] = &pb.Playlist{
			Id:   playlist.ID,
			Name: playlist.Name,
		}
	}

	return &pb.PlaylistList{Playlists: pbPlaylists}, nil
}

func (s *UserServiceServer) Create(ctx context.Context, req *pb.CreateUserRequest) (*pb.User, error) {
	createReq := &models.CreateUserRequest{
		Name: req.Name,
		Age:  req.Age,
	}

	user, err := s.supabase.CreateUser(ctx, createReq)
	if err != nil {
		return nil, err
	}

	return &pb.User{
		Id:   user.ID,
		Name: user.Name,
		Age:  user.Age,
	}, nil
}

func (s *UserServiceServer) Update(ctx context.Context, req *pb.UpdateUserRequest) (*pb.User, error) {
	updateReq := &models.UpdateUserRequest{
		ID: req.Id,
	}

	if req.Name != nil {
		updateReq.Name = req.Name
	}
	if req.Age != nil {
		updateReq.Age = req.Age
	}

	user, err := s.supabase.UpdateUser(ctx, updateReq)
	if err != nil {
		return nil, err
	}

	return &pb.User{
		Id:   user.ID,
		Name: user.Name,
		Age:  user.Age,
	}, nil
}

func (s *UserServiceServer) Delete(ctx context.Context, req *pb.UserById) (*pb.DeleteResponse, error) {
	err := s.supabase.DeleteUser(ctx, req.Id)
	if err != nil {
		return &pb.DeleteResponse{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return &pb.DeleteResponse{
		Success: true,
		Message: "User deleted successfully",
	}, nil
}

func (s *UserServiceServer) AddPlaylist(ctx context.Context, req *pb.AddPlaylistToUserRequest) (*pb.AddPlaylistResponse, error) {
	err := s.supabase.AddPlaylistToUser(ctx, req.UserId, req.PlaylistId)
	if err != nil {
		return nil, err
	}

	return &pb.AddPlaylistResponse{
		Success: true,
		Data: &pb.PlaylistToUserData{
			UserId:     req.UserId,
			PlaylistId: req.PlaylistId,
		},
	}, nil
}

func (s *UserServiceServer) RemovePlaylist(ctx context.Context, req *pb.RemovePlaylistFromUserRequest) (*pb.DeleteResponse, error) {
	err := s.supabase.RemovePlaylistFromUser(ctx, req.UserId, req.PlaylistId)
	if err != nil {
		return &pb.DeleteResponse{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return &pb.DeleteResponse{
		Success: true,
		Message: "Playlist removed from user",
	}, nil
}
