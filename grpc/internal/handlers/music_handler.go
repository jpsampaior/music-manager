package handlers

import (
	"context"

	"music-manager-go/internal/db"
	"music-manager-go/internal/models"
	pb "music-manager-go/proto/music"
)

type MusicServiceServer struct {
	pb.UnimplementedMusicServiceServer
	supabase *db.SupabaseService
}

func NewMusicServiceServer(supabase *db.SupabaseService) *MusicServiceServer {
	return &MusicServiceServer{
		supabase: supabase,
	}
}

func (s *MusicServiceServer) FindAll(ctx context.Context, req *pb.Empty) (*pb.MusicList, error) {
	musics, err := s.supabase.FindAllMusic(ctx)
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

func (s *MusicServiceServer) FindOne(ctx context.Context, req *pb.MusicById) (*pb.Music, error) {
	music, err := s.supabase.FindMusicByID(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &pb.Music{
		Id:     music.ID,
		Name:   music.Name,
		Artist: music.Artist,
	}, nil
}

func (s *MusicServiceServer) Create(ctx context.Context, req *pb.CreateMusicRequest) (*pb.Music, error) {
	createReq := &models.CreateMusicRequest{
		Name:   req.Name,
		Artist: req.Artist,
	}

	music, err := s.supabase.CreateMusic(ctx, createReq)
	if err != nil {
		return nil, err
	}

	return &pb.Music{
		Id:     music.ID,
		Name:   music.Name,
		Artist: music.Artist,
	}, nil
}

func (s *MusicServiceServer) Update(ctx context.Context, req *pb.UpdateMusicRequest) (*pb.Music, error) {
	updateReq := &models.UpdateMusicRequest{
		ID: req.Id,
	}

	if req.Name != nil {
		updateReq.Name = req.Name
	}
	if req.Artist != nil {
		updateReq.Artist = req.Artist
	}

	music, err := s.supabase.UpdateMusic(ctx, updateReq)
	if err != nil {
		return nil, err
	}

	return &pb.Music{
		Id:     music.ID,
		Name:   music.Name,
		Artist: music.Artist,
	}, nil
}

func (s *MusicServiceServer) Delete(ctx context.Context, req *pb.MusicById) (*pb.DeleteResponse, error) {
	err := s.supabase.DeleteMusic(ctx, req.Id)
	if err != nil {
		return &pb.DeleteResponse{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return &pb.DeleteResponse{
		Success: true,
		Message: "Music deleted successfully",
	}, nil
}
