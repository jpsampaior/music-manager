# Music Manager Go - gRPC API

API de gerenciamento de músicas, playlists e usuários implementada em Go com gRPC e Supabase.

## Estrutura do Projeto

```
music-manager-go/
├── cmd/
│   └── server/
│       └── main.go           # Ponto de entrada da aplicação
├── internal/
│   ├── db/
│   │   └── supabase.go       # Cliente e operações do Supabase
│   ├── handlers/
│   │   ├── music_handler.go    # Handler gRPC para Music
│   │   ├── playlist_handler.go # Handler gRPC para Playlist
│   │   └── user_handler.go     # Handler gRPC para User
│   └── models/
│       ├── music.go          # Modelos de Music
│       ├── playlist.go       # Modelos de Playlist
│       └── user.go           # Modelos de User
└── proto/
    ├── music.proto           # Definição do serviço Music
    ├── playlist.proto        # Definição do serviço Playlist
    └── user.proto            # Definição do serviço User
```

## Pré-requisitos

- Go 1.21 ou superior
- Conta Supabase configurada com as tabelas necessárias
- Protocol Buffer Compiler (protoc)
- Go plugins para protoc

## Instalação

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env` e configure as variáveis:
   ```bash
   cp .env.example .env
   ```

3. Edite o arquivo `.env` com suas credenciais do Supabase:
   ```
   SUPABASE_URL=sua_url_supabase
   SUPABASE_ANON_KEY=sua_chave_anonima_supabase
   GRPC_PORT=5000
   ```

4. Instale as dependências:
   ```bash
   go mod download
   ```

5. Instale as ferramentas para gerar código a partir dos arquivos proto:
   ```bash
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
   ```

6. Gere o código a partir dos arquivos `.proto`:
   ```bash
   protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/music.proto
   protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/playlist.proto
   protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/user.proto
   ```

## Estrutura do Banco de Dados (Supabase)

O projeto espera as seguintes tabelas no Supabase:

### Tabela: `music`
- `id` (int, primary key, auto-increment)
- `name` (text)
- `artist` (text)

### Tabela: `playlist`
- `id` (int, primary key, auto-increment)
- `name` (text)

### Tabela: `user`
- `id` (int, primary key, auto-increment)
- `name` (text)
- `age` (int)

### Tabela: `playlist_music` (relacionamento N:N)
- `playlistId` (int, foreign key → playlist.id)
- `musicId` (int, foreign key → music.id)

### Tabela: `user_playlist` (relacionamento N:N)
- `userId` (int, foreign key → user.id)
- `playlistId` (int, foreign key → playlist.id)

## Executando o Servidor

```bash
go run cmd/server/main.go
```

O servidor gRPC será iniciado na porta configurada (padrão: 5000).

## Serviços gRPC Disponíveis

### MusicService
- `FindAll()` - Lista todas as músicas
- `FindOne(id)` - Busca uma música por ID
- `Create(name, artist)` - Cria uma nova música
- `Update(id, name?, artist?)` - Atualiza uma música
- `Delete(id)` - Remove uma música

### PlaylistService
- `FindAll()` - Lista todas as playlists
- `FindOne(id)` - Busca uma playlist por ID
- `FindMusics(id)` - Lista músicas de uma playlist
- `FindUsers(id)` - Lista usuários que têm a playlist
- `Create(name)` - Cria uma nova playlist
- `Update(id, name?)` - Atualiza uma playlist
- `Delete(id)` - Remove uma playlist
- `AddMusic(playlistId, musicId)` - Adiciona música à playlist
- `RemoveMusic(playlistId, musicId)` - Remove música da playlist

### UserService
- `FindAll()` - Lista todos os usuários
- `FindOne(id)` - Busca um usuário por ID
- `FindPlaylists(id)` - Lista playlists de um usuário
- `Create(name, age)` - Cria um novo usuário
- `Update(id, name?, age?)` - Atualiza um usuário
- `Delete(id)` - Remove um usuário
- `AddPlaylist(userId, playlistId)` - Adiciona playlist ao usuário
- `RemovePlaylist(userId, playlistId)` - Remove playlist do usuário

## Testando com grpcurl

Instale o grpcurl:
```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```

Exemplos de uso:

```bash
# Listar serviços disponíveis
grpcurl -plaintext localhost:5000 list

# Listar todas as músicas
grpcurl -plaintext localhost:5000 music.MusicService/FindAll

# Criar uma música
grpcurl -plaintext -d '{"name": "Bohemian Rhapsody", "artist": "Queen"}' localhost:5000 music.MusicService/Create

# Buscar música por ID
grpcurl -plaintext -d '{"id": 1}' localhost:5000 music.MusicService/FindOne
```

## Build para Produção

```bash
go build -o music-manager-server cmd/server/main.go
./music-manager-server
```

## Migração do TypeScript

Esta implementação em Go é uma conversão completa da API TypeScript/NestJS original, mantendo:
- Mesma estrutura de dados
- Mesmos endpoints gRPC
- Mesma integração com Supabase
- Mesma lógica de negócios

### Principais Mudanças:
- **TypeScript → Go**: Código reescrito em Go
- **NestJS → Go nativo**: Sem framework, apenas biblioteca gRPC padrão
- **Decorators → Funções**: Handlers gRPC implementados como métodos
- **Supabase JS → Supabase Go**: Cliente Supabase para Go
