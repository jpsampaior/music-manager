package handlers

import (
	"context"

	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
	pb "music-manager-go/proto/playlist"
)

type PlaylistServiceServer struct {
	pb.UnimplementedPlaylistServiceServer
	supabase *db.SupabaseService
}

func NewPlaylistServiceServer(supabase *db.SupabaseService) *PlaylistServiceServer {
	return &PlaylistServiceServer{
		supabase: supabase,
	}
}

func (s *PlaylistServiceServer) FindAll(ctx context.Context, req *pb.Empty) (*pb.PlaylistList, error) {
	playlists, err := s.supabase.FindAllPlaylists(ctx)
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

func (s *PlaylistServiceServer) FindOne(ctx context.Context, req *pb.PlaylistById) (*pb.Playlist, error) {
	playlist, err := s.supabase.FindPlaylistByID(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &pb.Playlist{
		Id:   playlist.ID,
		Name: playlist.Name,
	}, nil
}

func (s *PlaylistServiceServer) FindMusics(ctx context.Context, req *pb.PlaylistById) (*pb.MusicList, error) {
	musics, err := s.supabase.FindMusicsByPlaylistID(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	pbMusics := make([]*pb.Music, len(musics))
	for i, music := range musics {
		pbMusics[i] = &pb.Music{
			Id:     music.ID,
			Name:   music.Name,
			Artist: music.Artist,
		}
	}

	return &pb.MusicList{Musics: pbMusics}, nil
}

func (s *PlaylistServiceServer) FindUsers(ctx context.Context, req *pb.PlaylistById) (*pb.UserList, error) {
	users, err := s.supabase.FindUsersByPlaylistID(ctx, req.Id)
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

func (s *PlaylistServiceServer) Create(ctx context.Context, req *pb.CreatePlaylistRequest) (*pb.Playlist, error) {
	createReq := &models.CreatePlaylistRequest{
		Name: req.Name,
	}

	playlist, err := s.supabase.CreatePlaylist(ctx, createReq)
	if err != nil {
		return nil, err
	}

	return &pb.Playlist{
		Id:   playlist.ID,
		Name: playlist.Name,
	}, nil
}

func (s *PlaylistServiceServer) Update(ctx context.Context, req *pb.UpdatePlaylistRequest) (*pb.Playlist, error) {
	updateReq := &models.UpdatePlaylistRequest{
		ID: req.Id,
	}

	if req.Name != nil {
		updateReq.Name = req.Name
	}

	playlist, err := s.supabase.UpdatePlaylist(ctx, updateReq)
	if err != nil {
		return nil, err
	}

	return &pb.Playlist{
		Id:   playlist.ID,
		Name: playlist.Name,
	}, nil
}

func (s *PlaylistServiceServer) Delete(ctx context.Context, req *pb.PlaylistById) (*pb.DeleteResponse, error) {
	err := s.supabase.DeletePlaylist(ctx, req.Id)
	if err != nil {
		return &pb.DeleteResponse{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return &pb.DeleteResponse{
		Success: true,
		Message: "Playlist deleted successfully",
	}, nil
}

func (s *PlaylistServiceServer) AddMusic(ctx context.Context, req *pb.AddMusicToPlaylistRequest) (*pb.AddMusicResponse, error) {
	err := s.supabase.AddMusicToPlaylist(ctx, req.PlaylistId, req.MusicId)
	if err != nil {
		return nil, err
	}

	return &pb.AddMusicResponse{
		Success: true,
		Data: &pb.MusicToPlaylistData{
			PlaylistId: req.PlaylistId,
			MusicId:    req.MusicId,
		},
	}, nil
}

func (s *PlaylistServiceServer) RemoveMusic(ctx context.Context, req *pb.RemoveMusicFromPlaylistRequest) (*pb.DeleteResponse, error) {
	err := s.supabase.RemoveMusicFromPlaylist(ctx, req.PlaylistId, req.MusicId)
	if err != nil {
		return &pb.DeleteResponse{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return &pb.DeleteResponse{
		Success: true,
		Message: "Music removed from playlist",
	}, nil
}
