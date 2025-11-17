# Exemplos de Queries e Mutations GraphQL

## Queries

### Buscar todas as músicas
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

### Buscar uma música por ID
```graphql
query {
  music(id: 1) {
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

### Buscar todas as playlists
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

### Buscar uma playlist por ID
```graphql
query {
  playlist(id: 1) {
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

### Buscar todos os usuários
```graphql
query {
  users {
    id
    name
    age
    playlists {
      id
      name
      musics {
        id
        name
        artist
      }
    }
  }
}
```

### Buscar um usuário por ID
```graphql
query {
  user(id: 1) {
    id
    name
    age
    playlists {
      id
      name
      musics {
        id
        name
        artist
      }
    }
  }
}
```

## Mutations

### Criar uma música
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

### Atualizar uma música
```graphql
mutation {
  updateMusic(input: {
    id: 1
    name: "Bohemian Rhapsody (Updated)"
    artist: "Queen"
  }) {
    id
    name
    artist
  }
}
```

### Deletar uma música
```graphql
mutation {
  removeMusic(id: 1)
}
```

### Criar uma playlist
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

### Atualizar uma playlist
```graphql
mutation {
  updatePlaylist(input: {
    id: 1
    name: "Minhas Favoritas (Atualizada)"
  }) {
    id
    name
  }
}
```

### Deletar uma playlist
```graphql
mutation {
  removePlaylist(id: 1)
}
```

### Adicionar música a uma playlist
```graphql
mutation {
  addMusicToPlaylist(input: {
    playlistId: 1
    musicId: 1
  })
}
```

### Remover música de uma playlist
```graphql
mutation {
  removeMusicFromPlaylist(playlistId: 1, musicId: 1)
}
```

### Criar um usuário
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

### Atualizar um usuário
```graphql
mutation {
  updateUser(input: {
    id: 1
    name: "João Silva (Atualizado)"
    age: 26
  }) {
    id
    name
    age
  }
}
```

### Deletar um usuário
```graphql
mutation {
  removeUser(id: 1)
}
```

### Adicionar playlist a um usuário
```graphql
mutation {
  addPlaylistToUser(input: {
    userId: 1
    playlistId: 1
  })
}
```

### Remover playlist de um usuário
```graphql
mutation {
  removePlaylistFromUser(userId: 1, playlistId: 1)
}
```

