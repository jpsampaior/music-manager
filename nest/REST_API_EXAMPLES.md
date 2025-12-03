# Exemplos de API REST

A API REST está disponível em `http://localhost:3000`

## Music Endpoints

### Listar todas as músicas
```http
GET /music
```

### Buscar uma música por ID
```http
GET /music/:id
```

### Buscar playlists que contêm uma música
```http
GET /music/:id/playlists
```

### Criar uma música
```http
POST /music
Content-Type: application/json

{
  "name": "Bohemian Rhapsody",
  "artist": "Queen"
}
```

### Atualizar uma música
```http
PUT /music/:id
Content-Type: application/json

{
  "name": "Bohemian Rhapsody (Updated)",
  "artist": "Queen"
}
```

### Deletar uma música
```http
DELETE /music/:id
```

## Playlist Endpoints

### Listar todas as playlists
```http
GET /playlist
```

### Buscar uma playlist por ID
```http
GET /playlist/:id
```

### Buscar músicas de uma playlist
```http
GET /playlist/:id/musics
```

### Buscar usuários de uma playlist
```http
GET /playlist/:id/users
```

### Criar uma playlist
```http
POST /playlist
Content-Type: application/json

{
  "name": "Minhas Favoritas"
}
```

### Atualizar uma playlist
```http
PUT /playlist/:id
Content-Type: application/json

{
  "name": "Minhas Favoritas (Atualizada)"
}
```

### Deletar uma playlist
```http
DELETE /playlist/:id
```

### Adicionar música a uma playlist
```http
POST /playlist/:id/music
Content-Type: application/json

{
  "musicId": 1
}
```

### Remover música de uma playlist
```http
DELETE /playlist/:id/music/:musicId
```

## User Endpoints

### Listar todos os usuários
```http
GET /user
```

### Buscar um usuário por ID
```http
GET /user/:id
```

### Buscar playlists de um usuário
```http
GET /user/:id/playlists
```

### Criar um usuário
```http
POST /user
Content-Type: application/json

{
  "name": "João Silva",
  "age": 25
}
```

### Atualizar um usuário
```http
PUT /user/:id
Content-Type: application/json

{
  "name": "João Silva (Atualizado)",
  "age": 26
}
```

### Deletar um usuário
```http
DELETE /user/:id
```

### Adicionar playlist a um usuário
```http
POST /user/:id/playlist
Content-Type: application/json

{
  "playlistId": 1
}
```

### Remover playlist de um usuário
```http
DELETE /user/:id/playlist/:playlistId
```

## Exemplos com cURL

### Criar uma música
```bash
curl -X POST http://localhost:3000/music \
  -H "Content-Type: application/json" \
  -d '{"name": "Bohemian Rhapsody", "artist": "Queen"}'
```

### Listar todas as músicas
```bash
curl http://localhost:3000/music
```

### Buscar uma música
```bash
curl http://localhost:3000/music/1
```

### Atualizar uma música
```bash
curl -X PUT http://localhost:3000/music/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Bohemian Rhapsody (Updated)", "artist": "Queen"}'
```

### Deletar uma música
```bash
curl -X DELETE http://localhost:3000/music/1
```

### Adicionar música a uma playlist
```bash
curl -X POST http://localhost:3000/playlist/1/music \
  -H "Content-Type: application/json" \
  -d '{"musicId": 1}'
```

### Buscar músicas de uma playlist
```bash
curl http://localhost:3000/playlist/1/musics
```

### Buscar playlists que contêm uma música
```bash
curl http://localhost:3000/music/1/playlists
```

