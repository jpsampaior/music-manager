# Makefile para Music Manager Go

.PHONY: help proto build run clean test

help: ## Mostra esta mensagem de ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

proto: ## Gera código Go a partir dos arquivos .proto
	@echo "Gerando código a partir dos arquivos proto..."
	@protoc --go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		proto/music.proto
	@protoc --go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		proto/playlist.proto
	@protoc --go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		proto/user.proto
	@echo "Código gerado com sucesso!"

build: proto ## Compila o projeto
	@echo "Compilando o projeto..."
	@go build -o music-manager-server cmd/server/main.go
	@echo "Compilação concluída!"

run: ## Executa o servidor
	@echo "Iniciando servidor..."
	@go run cmd/server/main.go

dev: proto ## Executa em modo desenvolvimento (com hot reload se air estiver instalado)
	@if command -v air > /dev/null; then \
		air; \
	else \
		echo "Air não está instalado. Executando normalmente..."; \
		go run cmd/server/main.go; \
	fi

deps: ## Instala as dependências
	@echo "Instalando dependências..."
	@go mod download
	@go mod tidy

install-tools: ## Instala ferramentas necessárias
	@echo "Instalando ferramentas..."
	@go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	@go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	@go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
	@echo "Ferramentas instaladas com sucesso!"

test: ## Executa os testes
	@echo "Executando testes..."
	@go test -v ./...

clean: ## Remove arquivos gerados
	@echo "Limpando arquivos gerados..."
	@rm -f music-manager-server
	@rm -f proto/**/*.pb.go
	@rm -f proto/**/*_grpc.pb.go
	@echo "Limpeza concluída!"

lint: ## Executa o linter
	@echo "Executando linter..."
	@golangci-lint run

fmt: ## Formata o código
	@echo "Formatando código..."
	@go fmt ./...
