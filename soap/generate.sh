#!/bin/bash

# Script para gerar código Go a partir dos arquivos .proto

echo "Gerando código a partir dos arquivos proto..."

protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/music.proto

protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/playlist.proto

protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/user.proto

echo "Código gerado com sucesso!"
