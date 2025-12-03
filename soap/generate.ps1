# Windows PowerShell script para gerar código Go a partir dos arquivos .proto

Write-Host "Gerando código a partir dos arquivos proto..." -ForegroundColor Green

protoc --go_out=. --go_opt=module=music-manager-go `
    --go-grpc_out=. --go-grpc_opt=module=music-manager-go `
    proto/music.proto

protoc --go_out=. --go_opt=module=music-manager-go `
    --go-grpc_out=. --go-grpc_opt=module=music-manager-go `
    proto/playlist.proto

protoc --go_out=. --go_opt=module=music-manager-go `
    --go-grpc_out=. --go-grpc_opt=module=music-manager-go `
    proto/user.proto

Write-Host "Código gerado com sucesso!" -ForegroundColor Green
