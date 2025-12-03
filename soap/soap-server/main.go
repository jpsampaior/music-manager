package main

import (
	"log"
	"os"

	"music-manager-go/internal/db"
	"music-manager-go/internal/soap"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	// Load environment variables
	port := os.Getenv("SOAP_PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize Supabase service
	supabaseService, err := db.NewSupabaseService()
	if err != nil {
		log.Fatalf("Failed to initialize Supabase service: %v", err)
	}

	// Create SOAP server
	soapServer := soap.NewSOAPServer(supabaseService)

	// Start SOAP server
	log.Printf("Starting SOAP server on port %s", port)
	log.Printf("WSDL endpoints available at:")
	log.Printf("  - http://localhost:%s/music/wsdl", port)
	log.Printf("  - http://localhost:%s/playlist/wsdl", port)
	log.Printf("  - http://localhost:%s/user/wsdl", port)
	log.Printf("Service endpoints:")
	log.Printf("  - http://localhost:%s/music", port)
	log.Printf("  - http://localhost:%s/playlist", port)
	log.Printf("  - http://localhost:%s/user", port)

	if err := soapServer.Start(port); err != nil {
		log.Fatalf("Failed to start SOAP server: %v", err)
	}
}
