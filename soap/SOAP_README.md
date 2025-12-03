# Music Manager - SOAP API

Este projeto implementa uma API SOAP em Go para gerenciar músicas, playlists e usuários.

## Estrutura do Projeto

```
.
├── cmd/
│   ├── server/          # Servidor gRPC
│   │   └── main.go
│   └── soap-server/     # Servidor SOAP
│       └── main.go
├── internal/
│   ├── db/
│   │   └── supabase.go  # Cliente Supabase
│   ├── handlers/        # Handlers gRPC
│   ├── models/          # Modelos de dados
│   └── soap/            # Handlers SOAP
│       ├── music_soap_handler.go
│       ├── playlist_soap_handler.go
│       ├── user_soap_handler.go
│       └── server.go
└── proto/               # Definições Protocol Buffers (gRPC)
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# gRPC Server
GRPC_PORT=5000

# SOAP Server
SOAP_PORT=8080
```

### Instalar Dependências

```powershell
go mod download
```

## Executar Servidores

### Servidor gRPC

```powershell
go run cmd/server/main.go
```

### Servidor SOAP

```powershell
go run cmd/soap-server/main.go
```

## API SOAP

### Endpoints

- **Music Service**: `http://localhost:8080/music`
- **Playlist Service**: `http://localhost:8080/playlist`
- **User Service**: `http://localhost:8080/user`

### WSDL

- **Music WSDL**: `http://localhost:8080/music/wsdl`
- **Playlist WSDL**: `http://localhost:8080/playlist/wsdl`
- **User WSDL**: `http://localhost:8080/user/wsdl`

## Exemplos de Requisições SOAP

### Music Service

#### FindAll (Listar todas as músicas)

```xml
POST http://localhost:8080/music
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindAll"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllMusicRequest xmlns="http://music.soap.manager/music"/>
  </soap:Body>
</soap:Envelope>
```

#### FindOne (Buscar música por ID)

```xml
POST http://localhost:8080/music
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindOne"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindOneMusicRequest xmlns="http://music.soap.manager/music">
      <id>1</id>
    </FindOneMusicRequest>
  </soap:Body>
</soap:Envelope>
```

#### Create (Criar nova música)

```xml
POST http://localhost:8080/music
Content-Type: text/xml; charset=utf-8
SOAPAction: "Create"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateMusicRequest xmlns="http://music.soap.manager/music">
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </CreateMusicRequest>
  </soap:Body>
</soap:Envelope>
```

#### Update (Atualizar música)

```xml
POST http://localhost:8080/music
Content-Type: text/xml; charset=utf-8
SOAPAction: "Update"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UpdateMusicRequest xmlns="http://music.soap.manager/music">
      <id>1</id>
      <name>New Name</name>
      <artist>New Artist</artist>
    </UpdateMusicRequest>
  </soap:Body>
</soap:Envelope>
```

#### Delete (Deletar música)

```xml
POST http://localhost:8080/music
Content-Type: text/xml; charset=utf-8
SOAPAction: "Delete"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <DeleteMusicRequest xmlns="http://music.soap.manager/music">
      <id>1</id>
    </DeleteMusicRequest>
  </soap:Body>
</soap:Envelope>
```

### Playlist Service

#### FindAll (Listar todas as playlists)

```xml
POST http://localhost:8080/playlist
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindAll"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllPlaylistsRequest xmlns="http://music.soap.manager/playlist"/>
  </soap:Body>
</soap:Envelope>
```

#### FindMusics (Buscar músicas de uma playlist)

```xml
POST http://localhost:8080/playlist
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindMusics"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindMusicsInPlaylistRequest xmlns="http://music.soap.manager/playlist">
      <id>1</id>
    </FindMusicsInPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

#### AddMusic (Adicionar música à playlist)

```xml
POST http://localhost:8080/playlist
Content-Type: text/xml; charset=utf-8
SOAPAction: "AddMusic"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AddMusicToPlaylistRequest xmlns="http://music.soap.manager/playlist">
      <playlistId>1</playlistId>
      <musicId>2</musicId>
    </AddMusicToPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

### User Service

#### FindAll (Listar todos os usuários)

```xml
POST http://localhost:8080/user
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindAll"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllUsersRequest xmlns="http://music.soap.manager/user"/>
  </soap:Body>
</soap:Envelope>
```

#### Create (Criar novo usuário)

```xml
POST http://localhost:8080/user
Content-Type: text/xml; charset=utf-8
SOAPAction: "Create"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateUserRequest xmlns="http://music.soap.manager/user">
      <name>John Doe</name>
      <age>30</age>
    </CreateUserRequest>
  </soap:Body>
</soap:Envelope>
```

#### FindPlaylists (Buscar playlists de um usuário)

```xml
POST http://localhost:8080/user
Content-Type: text/xml; charset=utf-8
SOAPAction: "FindPlaylists"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindPlaylistsOfUserRequest xmlns="http://music.soap.manager/user">
      <id>1</id>
    </FindPlaylistsOfUserRequest>
  </soap:Body>
</soap:Envelope>
```

#### AddPlaylist (Adicionar playlist ao usuário)

```xml
POST http://localhost:8080/user
Content-Type: text/xml; charset=utf-8
SOAPAction: "AddPlaylist"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AddPlaylistToUserRequest xmlns="http://music.soap.manager/user">
      <userId>1</userId>
      <playlistId>2</playlistId>
    </AddPlaylistToUserRequest>
  </soap:Body>
</soap:Envelope>
```

## Testar com PowerShell

### Exemplo de teste com Invoke-WebRequest

```powershell
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "FindAll"
}

$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllMusicRequest xmlns="http://music.soap.manager/music"/>
  </soap:Body>
</soap:Envelope>
"@

Invoke-WebRequest -Uri "http://localhost:8080/music" -Method POST -Headers $headers -Body $body
```

## Testar com curl

```bash
curl -X POST http://localhost:8080/music \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: FindAll" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllMusicRequest xmlns="http://music.soap.manager/music"/>
  </soap:Body>
</soap:Envelope>'
```

## Estrutura do Banco de Dados (Supabase)

### Tabelas

- **music**: id, name, artist
- **playlist**: id, name
- **user**: id, name, age
- **playlist_music**: playlistId, musicId
- **user_playlist**: userId, playlistId

## Tecnologias

- **Go 1.22+**
- **gRPC** - Para API gRPC
- **SOAP** - Para API SOAP (implementação nativa)
- **Supabase** - Backend as a Service
- **Protocol Buffers** - Serialização de dados para gRPC

## Licença

MIT
