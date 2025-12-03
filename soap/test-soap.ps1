# Exemplo de teste das requisições SOAP usando PowerShell

# Configuração
$baseUrl = "http://localhost:8080"

# ========================================
# MUSIC SERVICE
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MUSIC SERVICE TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# FindAll - Listar todas as músicas
Write-Host "`nTestando FindAll Music..." -ForegroundColor Yellow
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
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/music" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# Create - Criar nova música
Write-Host "`nTestando Create Music..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "Create"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateMusicRequest xmlns="http://music.soap.manager/music">
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </CreateMusicRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/music" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# FindOne - Buscar música por ID
Write-Host "`nTestando FindOne Music (ID=1)..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "FindOne"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindOneMusicRequest xmlns="http://music.soap.manager/music">
      <id>1</id>
    </FindOneMusicRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/music" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# ========================================
# PLAYLIST SERVICE
# ========================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PLAYLIST SERVICE TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# FindAll - Listar todas as playlists
Write-Host "`nTestando FindAll Playlist..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "FindAll"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllPlaylistsRequest xmlns="http://music.soap.manager/playlist"/>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/playlist" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# Create - Criar nova playlist
Write-Host "`nTestando Create Playlist..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "Create"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreatePlaylistRequest xmlns="http://music.soap.manager/playlist">
      <name>My Favorite Songs</name>
    </CreatePlaylistRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/playlist" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# AddMusic - Adicionar música à playlist
Write-Host "`nTestando AddMusic (PlaylistID=1, MusicID=1)..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "AddMusic"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AddMusicToPlaylistRequest xmlns="http://music.soap.manager/playlist">
      <playlistId>1</playlistId>
      <musicId>1</musicId>
    </AddMusicToPlaylistRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/playlist" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# ========================================
# USER SERVICE
# ========================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "USER SERVICE TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# FindAll - Listar todos os usuários
Write-Host "`nTestando FindAll User..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "FindAll"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindAllUsersRequest xmlns="http://music.soap.manager/user"/>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/user" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# Create - Criar novo usuário
Write-Host "`nTestando Create User..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "Create"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateUserRequest xmlns="http://music.soap.manager/user">
      <name>John Doe</name>
      <age>30</age>
    </CreateUserRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/user" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

# AddPlaylist - Adicionar playlist ao usuário
Write-Host "`nTestando AddPlaylist (UserID=1, PlaylistID=1)..." -ForegroundColor Yellow
$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = "AddPlaylist"
}
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AddPlaylistToUserRequest xmlns="http://music.soap.manager/user">
      <userId>1</userId>
      <playlistId>1</playlistId>
    </AddPlaylistToUserRequest>
  </soap:Body>
</soap:Envelope>
"@
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/user" -Method POST -Headers $headers -Body $body
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "Erro: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TESTES CONCLUÍDOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
