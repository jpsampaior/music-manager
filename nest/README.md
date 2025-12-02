# GraphQL & REST API - Music Playlist Manager

API completa para gerenciamento de músicas, playlists e usuários, desenvolvida com NestJS, GraphQL e REST, utilizando Supabase como banco de dados PostgreSQL.

## 🎯 Sobre o Projeto

Esta API permite gerenciar:
- **Músicas**: Cadastro de músicas com nome e artista
- **Playlists**: Criação e gerenciamento de playlists
- **Usuários**: Cadastro de usuários com nome e idade
- **Relacionamentos**: Associação de músicas a playlists e playlists a usuários

A API oferece duas interfaces:
- **GraphQL**: Para consultas flexíveis e eficientes
- **REST**: Para integração tradicional com endpoints HTTP

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **GraphQL** - Query language e runtime
- **Apollo Server** - Servidor GraphQL
- **Supabase** - Banco de dados PostgreSQL
- **TypeScript** - Linguagem de programação

## 📊 Estrutura do Banco de Dados

```
music (id, name, artist)
playlist (id, name)
user (id, name, age)
playlist_music (id, playlistId, musicId) - Relacionamento N:N
user_playlist (id, userId, playlistId) - Relacionamento N:N
```

## 🚀 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
PORT=3000
```

### 3. Executar o projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

A API estará disponível em:
- **REST API**: `http://localhost:3000`
- **GraphQL Playground**: `http://localhost:3000/graphql`

## 📚 Exemplos de Uso

### GraphQL

#### Queries

**Buscar todas as músicas:**
```graphql
query {
  musics {
    id
    name
    artist
    playlists {
      id
      name
    }
  }
}
```

**Buscar uma música por ID:**
```graphql
query {
  music(id: 1) {
    id
    name
    artist
  }
}
```

**Buscar todas as playlists com músicas e usuários:**
```graphql
query {
  playlists {
    id
    name
    musics {
      id
      name
      artist
    }
    users {
      id
      name
      age
    }
  }
}
```

#### Mutations

**Criar uma música:**
```graphql
mutation {
  createMusic(input: {
    name: "Bohemian Rhapsody"
    artist: "Queen"
  }) {
    id
    name
    artist
  }
}
```

**Criar uma playlist:**
```graphql
mutation {
  createPlaylist(input: {
    name: "Minhas Favoritas"
  }) {
    id
    name
  }
}
```

**Adicionar música a uma playlist:**
```graphql
mutation {
  addMusicToPlaylist(input: {
    playlistId: 1
    musicId: 1
  })
}
```

**Criar um usuário:**
```graphql
mutation {
  createUser(input: {
    name: "João Silva"
    age: 25
  }) {
    id
    name
    age
  }
}
```

**Adicionar playlist a um usuário:**
```graphql
mutation {
  addPlaylistToUser(input: {
    userId: 1
    playlistId: 1
  })
}
```

### REST API

#### Music Endpoints

**Listar todas as músicas:**
```bash
GET http://localhost:3000/music
```

**Buscar uma música:**
```bash
GET http://localhost:3000/music/1
```

**Criar uma música:**
```bash
POST http://localhost:3000/music
Content-Type: application/json

{
  "name": "Bohemian Rhapsody",
  "artist": "Queen"
}
```

**Atualizar uma música:**
```bash
PUT http://localhost:3000/music/1
Content-Type: application/json

{
  "name": "Bohemian Rhapsody (Updated)",
  "artist": "Queen"
}
```

**Deletar uma música:**
```bash
DELETE http://localhost:3000/music/1
```

#### Playlist Endpoints

**Listar todas as playlists:**
```bash
GET http://localhost:3000/playlist
```

**Buscar uma playlist:**
```bash
GET http://localhost:3000/playlist/1
```

**Buscar músicas de uma playlist:**
```bash
GET http://localhost:3000/playlist/1/musics
```

**Criar uma playlist:**
```bash
POST http://localhost:3000/playlist
Content-Type: application/json

{
  "name": "Minhas Favoritas"
}
```

**Adicionar música a uma playlist:**
```bash
POST http://localhost:3000/playlist/1/music
Content-Type: application/json

{
  "musicId": 1
}
```

**Remover música de uma playlist:**
```bash
DELETE http://localhost:3000/playlist/1/music/1
```

#### User Endpoints

**Listar todos os usuários:**
```bash
GET http://localhost:3000/user
```

**Buscar um usuário:**
```bash
GET http://localhost:3000/user/1
```

**Buscar playlists de um usuário:**
```bash
GET http://localhost:3000/user/1/playlists
```

**Criar um usuário:**
```bash
POST http://localhost:3000/user
Content-Type: application/json

{
  "name": "João Silva",
  "age": 25
}
```

**Adicionar playlist a um usuário:**
```bash
POST http://localhost:3000/user/1/playlist
Content-Type: application/json

{
  "playlistId": 1
}
## 📖 Documentação Completa

Para mais exemplos detalhados, consulte:
- [Exemplos GraphQL](./GRAPHQL_EXAMPLES.md)
- [Exemplos REST](./REST_API_EXAMPLES.md)

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/      # Controllers REST
├── entities/         # Entidades GraphQL
├── inputs/           # Inputs para mutations
├── resolvers/        # Resolvers GraphQL
├── supabase/         # Serviço Supabase
├── app.module.ts     # Módulo principal
└── main.ts           # Entry point
```

## 🔄 Comparação entre as Tecnologias

| Característica | REST | GraphQL |
|----------------|------|---------|
| **Porta** | 3000 | 3000 |
| **Formato** | JSON | JSON |
| **Protocolo** | HTTP/1.1 | HTTP/1.1 |
| **Tipagem** | Não | Sim (Schema) |
| **Performance** | Média | Alta |
| **Flexibilidade** | Baixa | Muito Alta |
| **Documentação** | Manual | Auto-gerada |
| **Caso de Uso** | APIs públicas | Apps modernos |