package db

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"music-manager-go/internal/models"

	"github.com/supabase-community/supabase-go"
)

type SupabaseService struct {
	client *supabase.Client
}

func NewSupabaseService() (*SupabaseService, error) {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		return nil, fmt.Errorf("SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables")
	}

	client, err := supabase.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create Supabase client: %w", err)
	}

	return &SupabaseService{client: client}, nil
}

// Music methods
func (s *SupabaseService) FindAllMusic(ctx context.Context) ([]models.Music, error) {
	data, _, err := s.client.From("music").Select("*", "exact", false).Execute()
	if err != nil {
		return nil, err
	}

	var musics []models.Music
	if err := json.Unmarshal(data, &musics); err != nil {
		return nil, err
	}

	return musics, nil
}

func (s *SupabaseService) FindMusicByID(ctx context.Context, id int32) (*models.Music, error) {
	data, _, err := s.client.From("music").Select("*", "exact", false).Eq("id", fmt.Sprintf("%d", id)).Single().Execute()
	if err != nil {
		return nil, err
	}

	var music models.Music
	if err := json.Unmarshal(data, &music); err != nil {
		return nil, err
	}

	return &music, nil
}

func (s *SupabaseService) CreateMusic(ctx context.Context, req *models.CreateMusicRequest) (*models.Music, error) {
	insertData := map[string]interface{}{
		"name":   req.Name,
		"artist": req.Artist,
	}

	data, _, err := s.client.From("music").Insert(insertData, false, "", "", "").Execute()
	if err != nil {
		return nil, err
	}

	var musics []models.Music
	if err := json.Unmarshal(data, &musics); err != nil {
		return nil, err
	}

	if len(musics) == 0 {
		return nil, fmt.Errorf("no music created")
	}

	return &musics[0], nil
}

func (s *SupabaseService) UpdateMusic(ctx context.Context, req *models.UpdateMusicRequest) (*models.Music, error) {
	updateData := make(map[string]interface{})
	if req.Name != nil {
		updateData["name"] = *req.Name
	}
	if req.Artist != nil {
		updateData["artist"] = *req.Artist
	}

	data, _, err := s.client.From("music").Update(updateData, "", "").Eq("id", fmt.Sprintf("%d", req.ID)).Execute()
	if err != nil {
		return nil, err
	}

	var musics []models.Music
	if err := json.Unmarshal(data, &musics); err != nil {
		return nil, err
	}

	if len(musics) == 0 {
		return nil, fmt.Errorf("no music updated")
	}

	return &musics[0], nil
}

func (s *SupabaseService) DeleteMusic(ctx context.Context, id int32) error {
	_, _, err := s.client.From("music").Delete("", "").Eq("id", fmt.Sprintf("%d", id)).Execute()
	return err
}

// Playlist methods
func (s *SupabaseService) FindAllPlaylists(ctx context.Context) ([]models.Playlist, error) {
	data, _, err := s.client.From("playlist").Select("*", "exact", false).Execute()
	if err != nil {
		return nil, err
	}

	var playlists []models.Playlist
	if err := json.Unmarshal(data, &playlists); err != nil {
		return nil, err
	}

	return playlists, nil
}

func (s *SupabaseService) FindPlaylistByID(ctx context.Context, id int32) (*models.Playlist, error) {
	data, _, err := s.client.From("playlist").Select("*", "exact", false).Eq("id", fmt.Sprintf("%d", id)).Single().Execute()
	if err != nil {
		return nil, err
	}

	var playlist models.Playlist
	if err := json.Unmarshal(data, &playlist); err != nil {
		return nil, err
	}

	return &playlist, nil
}

func (s *SupabaseService) CreatePlaylist(ctx context.Context, req *models.CreatePlaylistRequest) (*models.Playlist, error) {
	insertData := map[string]interface{}{
		"name": req.Name,
	}

	data, _, err := s.client.From("playlist").Insert(insertData, false, "", "", "").Execute()
	if err != nil {
		return nil, err
	}

	var playlists []models.Playlist
	if err := json.Unmarshal(data, &playlists); err != nil {
		return nil, err
	}

	if len(playlists) == 0 {
		return nil, fmt.Errorf("no playlist created")
	}

	return &playlists[0], nil
}

func (s *SupabaseService) UpdatePlaylist(ctx context.Context, req *models.UpdatePlaylistRequest) (*models.Playlist, error) {
	updateData := make(map[string]interface{})
	if req.Name != nil {
		updateData["name"] = *req.Name
	}

	data, _, err := s.client.From("playlist").Update(updateData, "", "").Eq("id", fmt.Sprintf("%d", req.ID)).Execute()
	if err != nil {
		return nil, err
	}

	var playlists []models.Playlist
	if err := json.Unmarshal(data, &playlists); err != nil {
		return nil, err
	}

	if len(playlists) == 0 {
		return nil, fmt.Errorf("no playlist updated")
	}

	return &playlists[0], nil
}

func (s *SupabaseService) DeletePlaylist(ctx context.Context, id int32) error {
	_, _, err := s.client.From("playlist").Delete("", "").Eq("id", fmt.Sprintf("%d", id)).Execute()
	return err
}

func (s *SupabaseService) FindMusicsByPlaylistID(ctx context.Context, playlistID int32) ([]models.Music, error) {
	// First, get music IDs from playlist_music
	data, _, err := s.client.From("playlist_music").Select("musicId", "exact", false).Eq("playlistId", fmt.Sprintf("%d", playlistID)).Execute()
	if err != nil {
		return []models.Music{}, nil
	}

	var playlistMusics []struct {
		MusicID int32 `json:"musicId"`
	}
	if err := json.Unmarshal(data, &playlistMusics); err != nil {
		return []models.Music{}, nil
	}

	if len(playlistMusics) == 0 {
		return []models.Music{}, nil
	}

	// Get music IDs
	musicIDs := make([]string, len(playlistMusics))
	for i, pm := range playlistMusics {
		musicIDs[i] = fmt.Sprintf("%d", pm.MusicID)
	}

	// Get musics
	musicData, _, err := s.client.From("music").Select("*", "exact", false).In("id", musicIDs).Execute()
	if err != nil {
		return nil, err
	}

	var musics []models.Music
	if err := json.Unmarshal(musicData, &musics); err != nil {
		return nil, err
	}

	return musics, nil
}

func (s *SupabaseService) FindUsersByPlaylistID(ctx context.Context, playlistID int32) ([]models.User, error) {
	// First, get user IDs from user_playlist
	data, _, err := s.client.From("user_playlist").Select("userId", "exact", false).Eq("playlistId", fmt.Sprintf("%d", playlistID)).Execute()
	if err != nil {
		return []models.User{}, nil
	}

	var userPlaylists []struct {
		UserID int32 `json:"userId"`
	}
	if err := json.Unmarshal(data, &userPlaylists); err != nil {
		return []models.User{}, nil
	}

	if len(userPlaylists) == 0 {
		return []models.User{}, nil
	}

	// Get user IDs
	userIDs := make([]string, len(userPlaylists))
	for i, up := range userPlaylists {
		userIDs[i] = fmt.Sprintf("%d", up.UserID)
	}

	// Get users
	userData, _, err := s.client.From("user").Select("*", "exact", false).In("id", userIDs).Execute()
	if err != nil {
		return nil, err
	}

	var users []models.User
	if err := json.Unmarshal(userData, &users); err != nil {
		return nil, err
	}

	return users, nil
}

func (s *SupabaseService) AddMusicToPlaylist(ctx context.Context, playlistID, musicID int32) error {
	insertData := map[string]interface{}{
		"playlistId": playlistID,
		"musicId":    musicID,
	}

	_, _, err := s.client.From("playlist_music").Insert(insertData, false, "", "", "").Execute()
	return err
}

func (s *SupabaseService) RemoveMusicFromPlaylist(ctx context.Context, playlistID, musicID int32) error {
	_, _, err := s.client.From("playlist_music").Delete("", "").Eq("playlistId", fmt.Sprintf("%d", playlistID)).Eq("musicId", fmt.Sprintf("%d", musicID)).Execute()
	return err
}

// User methods
func (s *SupabaseService) FindAllUsers(ctx context.Context) ([]models.User, error) {
	data, _, err := s.client.From("user").Select("*", "exact", false).Execute()
	if err != nil {
		return nil, err
	}

	var users []models.User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	return users, nil
}

func (s *SupabaseService) FindUserByID(ctx context.Context, id int32) (*models.User, error) {
	data, _, err := s.client.From("user").Select("*", "exact", false).Eq("id", fmt.Sprintf("%d", id)).Single().Execute()
	if err != nil {
		return nil, err
	}

	var user models.User
	if err := json.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *SupabaseService) CreateUser(ctx context.Context, req *models.CreateUserRequest) (*models.User, error) {
	insertData := map[string]interface{}{
		"name": req.Name,
		"age":  req.Age,
	}

	data, _, err := s.client.From("user").Insert(insertData, false, "", "", "").Execute()
	if err != nil {
		return nil, err
	}

	var users []models.User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no user created")
	}

	return &users[0], nil
}

func (s *SupabaseService) UpdateUser(ctx context.Context, req *models.UpdateUserRequest) (*models.User, error) {
	updateData := make(map[string]interface{})
	if req.Name != nil {
		updateData["name"] = *req.Name
	}
	if req.Age != nil {
		updateData["age"] = *req.Age
	}

	data, _, err := s.client.From("user").Update(updateData, "", "").Eq("id", fmt.Sprintf("%d", req.ID)).Execute()
	if err != nil {
		return nil, err
	}

	var users []models.User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no user updated")
	}

	return &users[0], nil
}

func (s *SupabaseService) DeleteUser(ctx context.Context, id int32) error {
	_, _, err := s.client.From("user").Delete("", "").Eq("id", fmt.Sprintf("%d", id)).Execute()
	return err
}

func (s *SupabaseService) FindPlaylistsByUserID(ctx context.Context, userID int32) ([]models.Playlist, error) {
	// First, get playlist IDs from user_playlist
	data, _, err := s.client.From("user_playlist").Select("playlistId", "exact", false).Eq("userId", fmt.Sprintf("%d", userID)).Execute()
	if err != nil {
		return []models.Playlist{}, nil
	}

	var userPlaylists []struct {
		PlaylistID int32 `json:"playlistId"`
	}
	if err := json.Unmarshal(data, &userPlaylists); err != nil {
		return []models.Playlist{}, nil
	}

	if len(userPlaylists) == 0 {
		return []models.Playlist{}, nil
	}

	// Get playlist IDs
	playlistIDs := make([]string, len(userPlaylists))
	for i, up := range userPlaylists {
		playlistIDs[i] = fmt.Sprintf("%d", up.PlaylistID)
	}

	// Get playlists
	playlistData, _, err := s.client.From("playlist").Select("*", "exact", false).In("id", playlistIDs).Execute()
	if err != nil {
		return nil, err
	}

	var playlists []models.Playlist
	if err := json.Unmarshal(playlistData, &playlists); err != nil {
		return nil, err
	}

	return playlists, nil
}

func (s *SupabaseService) AddPlaylistToUser(ctx context.Context, userID, playlistID int32) error {
	insertData := map[string]interface{}{
		"userId":     userID,
		"playlistId": playlistID,
	}

	_, _, err := s.client.From("user_playlist").Insert(insertData, false, "", "", "").Execute()
	return err
}

func (s *SupabaseService) RemovePlaylistFromUser(ctx context.Context, userID, playlistID int32) error {
	_, _, err := s.client.From("user_playlist").Delete("", "").Eq("userId", fmt.Sprintf("%d", userID)).Eq("playlistId", fmt.Sprintf("%d", playlistID)).Execute()
	return err
}
