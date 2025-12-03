package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"music-manager-go/internal/db"
	"music-manager-go/internal/handlers"
	musicpb "music-manager-go/proto/music"
	playlistpb "music-manager-go/proto/playlist"
	userpb "music-manager-go/proto/user"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	// Load environment variables
	port := os.Getenv("GRPC_PORT")
	if port == "" {
		port = "5000"
	}

	// Initialize Supabase service
	supabaseService, err := db.NewSupabaseService()
	if err != nil {
		log.Fatalf("Failed to initialize Supabase service: %v", err)
	}

	// Create gRPC server
	grpcServer := grpc.NewServer()

	// Register services
	musicpb.RegisterMusicServiceServer(grpcServer, handlers.NewMusicServiceServer(supabaseService))
	playlistpb.RegisterPlaylistServiceServer(grpcServer, handlers.NewPlaylistServiceServer(supabaseService))
	userpb.RegisterUserServiceServer(grpcServer, handlers.NewUserServiceServer(supabaseService))

	// Register reflection service for tools like grpcurl
	reflection.Register(grpcServer)

	// Start listening
	listener, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%s", port))
	if err != nil {
		log.Fatalf("Failed to listen on port %s: %v", port, err)
	}

	log.Printf("gRPC server running on port %s", port)
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
