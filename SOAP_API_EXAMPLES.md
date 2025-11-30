# Exemplos de API SOAP

A API SOAP está disponível em `http://localhost:8000/soap`

O WSDL está disponível em `http://localhost:8000/soap?wsdl`

## Visão Geral

O serviço SOAP implementa todas as operações de gerenciamento de músicas, usuários e playlists seguindo o padrão definido no arquivo `service.wsdl`.

## Operações Disponíveis

### Operações de Usuário (User)
- `createUser` - Criar um novo usuário
- `getUser` - Buscar um usuário por ID
- `updateUser` - Atualizar um usuário existente
- `deleteUser` - Deletar um usuário
- `listUsers` - Listar todos os usuários

### Operações de Música (Song)
- `createSong` - Criar uma nova música
- `getSong` - Buscar uma música por ID
- `updateSong` - Atualizar uma música existente
- `deleteSong` - Deletar uma música
- `listSongs` - Listar todas as músicas
- `listSongsByPlaylist` - Listar músicas de uma playlist

### Operações de Playlist
- `createPlaylist` - Criar uma nova playlist
- `getPlaylist` - Buscar uma playlist por ID
- `updatePlaylist` - Atualizar uma playlist existente
- `deletePlaylist` - Deletar uma playlist
- `listPlaylists` - Listar todas as playlists
- `addSongsToPlaylist` - Adicionar músicas a uma playlist
- `removeSongsFromPlaylist` - Remover músicas de uma playlist
- `listPlaylistsBySong` - Listar playlists que contêm uma música

## Exemplos de Requisições

### 1. Criar Usuário

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: createUser

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createUserRequest>
      <name>João Silva</name>
      <age>25</age>
    </tns:createUserRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:createUserResponse xmlns:tns="urn:tns">
      <id>1</id>
    </tns:createUserResponse>
  </soap:Body>
</soap:Envelope>
```

### 2. Buscar Usuário

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: getUser

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:getUserRequest>
      <id>1</id>
    </tns:getUserRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:getUserResponse xmlns:tns="urn:tns">
      <user>
        <id>1</id>
        <name>João Silva</name>
        <age>25</age>
      </user>
    </tns:getUserResponse>
  </soap:Body>
</soap:Envelope>
```

### 3. Listar Todos os Usuários

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: listUsers

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:listUsersRequest/>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:listUsersResponse xmlns:tns="urn:tns">
      <users>
        <item>
          <id>1</id>
          <name>João Silva</name>
          <age>25</age>
        </item>
        <item>
          <id>2</id>
          <name>Maria Santos</name>
          <age>30</age>
        </item>
      </users>
    </tns:listUsersResponse>
  </soap:Body>
</soap:Envelope>
```

### 4. Criar Música

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: createSong

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createSongRequest>
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </tns:createSongRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:createSongResponse xmlns:tns="urn:tns">
      <id>1</id>
    </tns:createSongResponse>
  </soap:Body>
</soap:Envelope>
```

### 5. Atualizar Música

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: updateSong

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:updateSongRequest>
      <id>1</id>
      <name>Bohemian Rhapsody (Remastered)</name>
      <artist>Queen</artist>
    </tns:updateSongRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:updateSongResponse xmlns:tns="urn:tns">
      <success>true</success>
    </tns:updateSongResponse>
  </soap:Body>
</soap:Envelope>
```

### 6. Listar Músicas

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: listSongs

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:listSongsRequest/>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:listSongsResponse xmlns:tns="urn:tns">
      <songs>
        <item>
          <id>1</id>
          <name>Bohemian Rhapsody</name>
          <artist>Queen</artist>
        </item>
        <item>
          <id>2</id>
          <name>Imagine</name>
          <artist>John Lennon</artist>
        </item>
      </songs>
    </tns:listSongsResponse>
  </soap:Body>
</soap:Envelope>
```

### 7. Criar Playlist

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: createPlaylist

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createPlaylistRequest>
      <name>Minhas Favoritas</name>
    </tns:createPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:createPlaylistResponse xmlns:tns="urn:tns">
      <id>1</id>
    </tns:createPlaylistResponse>
  </soap:Body>
</soap:Envelope>
```

### 8. Adicionar Músicas a uma Playlist

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: addSongsToPlaylist

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:addSongsToPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>1,2,3</song_ids>
    </tns:addSongsToPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:addSongsToPlaylistResponse xmlns:tns="urn:tns">
      <success>true</success>
    </tns:addSongsToPlaylistResponse>
  </soap:Body>
</soap:Envelope>
```

### 9. Listar Músicas de uma Playlist

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: listSongsByPlaylist

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:listSongsByPlaylistRequest>
      <playlist_id>1</playlist_id>
    </tns:listSongsByPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:listSongsByPlaylistResponse xmlns:tns="urn:tns">
      <songs>
        <item>
          <id>1</id>
          <name>Bohemian Rhapsody</name>
          <artist>Queen</artist>
        </item>
        <item>
          <id>2</id>
          <name>Imagine</name>
          <artist>John Lennon</artist>
        </item>
      </songs>
    </tns:listSongsByPlaylistResponse>
  </soap:Body>
</soap:Envelope>
```

### 10. Remover Músicas de uma Playlist

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: removeSongsFromPlaylist

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:removeSongsFromPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>2</song_ids>
    </tns:removeSongsFromPlaylistRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:removeSongsFromPlaylistResponse xmlns:tns="urn:tns">
      <success>true</success>
    </tns:removeSongsFromPlaylistResponse>
  </soap:Body>
</soap:Envelope>
```

### 11. Deletar Usuário

```xml
POST http://localhost:8000/soap
Content-Type: text/xml
SOAPAction: deleteUser

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:deleteUserRequest>
      <id>1</id>
    </tns:deleteUserRequest>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:deleteUserResponse xmlns:tns="urn:tns">
      <success>true</success>
    </tns:deleteUserResponse>
  </soap:Body>
</soap:Envelope>
```

## Como Testar a API SOAP

### Usando PowerShell

PowerShell possui excelente suporte para testar APIs SOAP. Aqui estão exemplos práticos:

#### 1. Criar um Usuário

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createUserRequest>
      <name>João Silva</name>
      <age>25</age>
    </tns:createUserRequest>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="createUser"} `
  -Body $soapRequest

$response.Content
```

#### 2. Listar Todos os Usuários

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:listUsersRequest/>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="listUsers"} `
  -Body $soapRequest

$response.Content
```

#### 3. Criar uma Música

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createSongRequest>
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </tns:createSongRequest>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="createSong"} `
  -Body $soapRequest

$response.Content
```

#### 4. Criar uma Playlist

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:createPlaylistRequest>
      <name>Minhas Favoritas</name>
    </tns:createPlaylistRequest>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="createPlaylist"} `
  -Body $soapRequest

$response.Content
```

#### 5. Adicionar Músicas à Playlist

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:addSongsToPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>1,2</song_ids>
    </tns:addSongsToPlaylistRequest>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="addSongsToPlaylist"} `
  -Body $soapRequest

$response.Content
```

#### 6. Listar Músicas de uma Playlist

```powershell
$soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    <tns:listSongsByPlaylistRequest>
      <playlist_id>1</playlist_id>
    </tns:listSongsByPlaylistRequest>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
  -Uri "http://localhost:8000/soap" `
  -Method POST `
  -ContentType "text/xml" `
  -Headers @{"SOAPAction"="listSongsByPlaylist"} `
  -Body $soapRequest

$response.Content
```

### Usando cURL (Bash/PowerShell)

#### PowerShell com cURL

```powershell
# Criar usuário
curl -X POST http://localhost:8000/soap `
  -H "Content-Type: text/xml" `
  -H "SOAPAction: createUser" `
  -d @"
<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"
               xmlns:tns=\"urn:tns\">
  <soap:Body>
    <tns:createUserRequest>
      <name>João Silva</name>
      <age>25</age>
    </tns:createUserRequest>
  </soap:Body>
</soap:Envelope>
"@
```

### Usando SOAP UI

1. Baixe e instale o [SOAP UI](https://www.soapui.org/downloads/soapui/)
2. Crie um novo projeto SOAP
3. Adicione o WSDL: `http://localhost:8000/soap?wsdl`
4. O SOAP UI gerará automaticamente exemplos de requisições para cada operação
5. Execute as requisições diretamente pela interface

### Usando Postman

1. Abra o Postman
2. Crie uma nova requisição POST
3. URL: `http://localhost:8000/soap`
4. Em **Headers**, adicione:
   - `Content-Type`: `text/xml`
   - `SOAPAction`: (nome da operação, ex: `createUser`)
5. Em **Body**, selecione `raw` e cole o XML da requisição SOAP
6. Clique em **Send**

### Testar WSDL

Para verificar se o WSDL está acessível:

```powershell
Invoke-WebRequest -Uri "http://localhost:8000/soap?wsdl"
```

Ou no navegador: `http://localhost:8000/soap?wsdl`

## Script de Teste Completo em PowerShell

Aqui está um script completo para testar todas as operações:

```powershell
# Função auxiliar para fazer requisições SOAP
function Invoke-SoapRequest {
    param (
        [string]$SoapAction,
        [string]$Body
    )
    
    $soapRequest = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="urn:tns">
  <soap:Body>
    $Body
  </soap:Body>
</soap:Envelope>
"@
    
    try {
        $response = Invoke-WebRequest `
            -Uri "http://localhost:8000/soap" `
            -Method POST `
            -ContentType "text/xml" `
            -Headers @{"SOAPAction"=$SoapAction} `
            -Body $soapRequest
        
        Write-Host "`n=== $SoapAction ===" -ForegroundColor Green
        $response.Content
    } catch {
        Write-Host "`nErro ao executar $SoapAction : $_" -ForegroundColor Red
    }
}

# 1. Criar usuário
Invoke-SoapRequest -SoapAction "createUser" -Body @"
    <tns:createUserRequest>
      <name>João Silva</name>
      <age>25</age>
    </tns:createUserRequest>
"@

# 2. Listar usuários
Invoke-SoapRequest -SoapAction "listUsers" -Body "<tns:listUsersRequest/>"

# 3. Criar música
Invoke-SoapRequest -SoapAction "createSong" -Body @"
    <tns:createSongRequest>
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </tns:createSongRequest>
"@

# 4. Criar mais uma música
Invoke-SoapRequest -SoapAction "createSong" -Body @"
    <tns:createSongRequest>
      <name>Imagine</name>
      <artist>John Lennon</artist>
    </tns:createSongRequest>
"@

# 5. Listar músicas
Invoke-SoapRequest -SoapAction "listSongs" -Body "<tns:listSongsRequest/>"

# 6. Criar playlist
Invoke-SoapRequest -SoapAction "createPlaylist" -Body @"
    <tns:createPlaylistRequest>
      <name>Rock Clássico</name>
    </tns:createPlaylistRequest>
"@

# 7. Adicionar músicas à playlist
Invoke-SoapRequest -SoapAction "addSongsToPlaylist" -Body @"
    <tns:addSongsToPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>1,2</song_ids>
    </tns:addSongsToPlaylistRequest>
"@

# 8. Listar músicas da playlist
Invoke-SoapRequest -SoapAction "listSongsByPlaylist" -Body @"
    <tns:listSongsByPlaylistRequest>
      <playlist_id>1</playlist_id>
    </tns:listSongsByPlaylistRequest>
"@

# 9. Buscar playlist específica
Invoke-SoapRequest -SoapAction "getPlaylist" -Body @"
    <tns:getPlaylistRequest>
      <id>1</id>
    </tns:getPlaylistRequest>
"@

Write-Host "`n✅ Todos os testes executados!" -ForegroundColor Cyan
```

Salve este script como `test-soap.ps1` e execute:

```powershell
.\test-soap.ps1
```

## Observações Importantes

1. **Servidor deve estar rodando**: Certifique-se de que o servidor está rodando em `http://localhost:8000`
2. **WSDL disponível**: O WSDL deve estar acessível em `http://localhost:8000/soap?wsdl`
3. **IDs sequenciais**: Os IDs são gerados automaticamente pelo banco de dados
4. **Formato de IDs**: Para adicionar/remover músicas de playlists, use IDs separados por vírgula (ex: `"1,2,3"`)
5. **Namespaces**: Use o namespace `urn:tns` conforme definido no WSDL

## Comparação com outras tecnologias

| Operação | REST | GraphQL | gRPC | SOAP |
|----------|------|---------|------|------|
| Criar Música | POST /music | mutation createMusic | CreateMusic | createSong |
| Listar Músicas | GET /music | query musics | ListMusics | listSongs |
| Protocolo | HTTP/JSON | HTTP/JSON | HTTP/2/Protobuf | HTTP/XML |
| Porta | 3000 | 3000 | 5000 | 8000 |

## Vantagens do SOAP

- ✅ **Fortemente tipado**: WSDL define contratos claros
- ✅ **Padrão estabelecido**: Amplamente usado em sistemas corporativos
- ✅ **Segurança integrada**: WS-Security
- ✅ **Transações**: Suporte a transações distribuídas

## Desvantagens do SOAP

- ❌ **Verboso**: XML é mais pesado que JSON
- ❌ **Complexidade**: Maior curva de aprendizado
- ❌ **Performance**: Parsing de XML é mais lento
- ❌ **Menos popular**: Tecnologias mais modernas são preferidas
