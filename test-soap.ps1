# Script de teste para API SOAP do Music Manager
# Execute com: .\test-soap.ps1

Write-Host "`n=== Testando API SOAP do Music Manager ===`n" -ForegroundColor Cyan

# Funcao auxiliar para fazer requisicoes SOAP
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

# Testar se o servidor esta rodando
Write-Host "Verificando se o servidor SOAP esta rodando..." -ForegroundColor Yellow
try {
    $wsdl = Invoke-WebRequest -Uri "http://localhost:8000/soap?wsdl" -TimeoutSec 5
    Write-Host "OK - Servidor SOAP esta rodando!`n" -ForegroundColor Green
} catch {
    Write-Host "ERRO - Servidor SOAP nao esta rodando em http://localhost:8000" -ForegroundColor Red
    Write-Host "Execute 'npm run start:dev' antes de rodar este script.`n" -ForegroundColor Yellow
    exit
}

# 1. Criar usuario
Write-Host "`n1. Criando usuario..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createUser" -Body @"
    <tns:createUserRequest>
      <name>Joao Silva</name>
      <age>25</age>
    </tns:createUserRequest>
"@

Start-Sleep -Milliseconds 500

# 2. Criar mais um usuario
Write-Host "`n2. Criando outro usuario..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createUser" -Body @"
    <tns:createUserRequest>
      <name>Maria Santos</name>
      <age>30</age>
    </tns:createUserRequest>
"@

Start-Sleep -Milliseconds 500

# 3. Listar usuarios
Write-Host "`n3. Listando todos os usuarios..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listUsers" -Body "<tns:listUsersRequest/>"

Start-Sleep -Milliseconds 500

# 4. Criar musica
Write-Host "`n4. Criando musica..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createSong" -Body @"
    <tns:createSongRequest>
      <name>Bohemian Rhapsody</name>
      <artist>Queen</artist>
    </tns:createSongRequest>
"@

Start-Sleep -Milliseconds 500

# 5. Criar mais uma musica
Write-Host "`n5. Criando outra musica..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createSong" -Body @"
    <tns:createSongRequest>
      <name>Imagine</name>
      <artist>John Lennon</artist>
    </tns:createSongRequest>
"@

Start-Sleep -Milliseconds 500

# 6. Criar terceira musica
Write-Host "`n6. Criando terceira musica..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createSong" -Body @"
    <tns:createSongRequest>
      <name>Stairway to Heaven</name>
      <artist>Led Zeppelin</artist>
    </tns:createSongRequest>
"@

Start-Sleep -Milliseconds 500

# 7. Listar musicas
Write-Host "`n7. Listando todas as musicas..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listSongs" -Body "<tns:listSongsRequest/>"

Start-Sleep -Milliseconds 500

# 8. Buscar uma musica especifica
Write-Host "`n8. Buscando musica por ID..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "getSong" -Body @"
    <tns:getSongRequest>
      <id>1</id>
    </tns:getSongRequest>
"@

Start-Sleep -Milliseconds 500

# 9. Criar playlist
Write-Host "`n9. Criando playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createPlaylist" -Body @"
    <tns:createPlaylistRequest>
      <name>Rock Classico</name>
    </tns:createPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 10. Criar outra playlist
Write-Host "`n10. Criando outra playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "createPlaylist" -Body @"
    <tns:createPlaylistRequest>
      <name>Musicas Relaxantes</name>
    </tns:createPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 11. Listar playlists
Write-Host "`n11. Listando todas as playlists..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listPlaylists" -Body "<tns:listPlaylistsRequest/>"

Start-Sleep -Milliseconds 500

# 12. Adicionar musicas a playlist
Write-Host "`n12. Adicionando musicas a playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "addSongsToPlaylist" -Body @"
    <tns:addSongsToPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>1,2,3</song_ids>
    </tns:addSongsToPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 13. Listar musicas da playlist
Write-Host "`n13. Listando musicas da playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listSongsByPlaylist" -Body @"
    <tns:listSongsByPlaylistRequest>
      <playlist_id>1</playlist_id>
    </tns:listSongsByPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 14. Buscar playlist especifica
Write-Host "`n14. Buscando playlist por ID..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "getPlaylist" -Body @"
    <tns:getPlaylistRequest>
      <id>1</id>
    </tns:getPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 15. Atualizar musica
Write-Host "`n15. Atualizando musica..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "updateSong" -Body @"
    <tns:updateSongRequest>
      <id>1</id>
      <name>Bohemian Rhapsody (Remastered)</name>
      <artist>Queen</artist>
    </tns:updateSongRequest>
"@

Start-Sleep -Milliseconds 500

# 16. Atualizar playlist
Write-Host "`n16. Atualizando playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "updatePlaylist" -Body @"
    <tns:updatePlaylistRequest>
      <id>1</id>
      <name>Rock Classico - Melhores</name>
    </tns:updatePlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 17. Listar playlists que contem uma musica
Write-Host "`n17. Listando playlists que contem uma musica..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listPlaylistsBySong" -Body @"
    <tns:listPlaylistsBySongRequest>
      <song_id>1</song_id>
    </tns:listPlaylistsBySongRequest>
"@

Start-Sleep -Milliseconds 500

# 18. Remover uma musica da playlist
Write-Host "`n18. Removendo musica da playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "removeSongsFromPlaylist" -Body @"
    <tns:removeSongsFromPlaylistRequest>
      <playlist_id>1</playlist_id>
      <song_ids>2</song_ids>
    </tns:removeSongsFromPlaylistRequest>
"@

Start-Sleep -Milliseconds 500

# 19. Verificar musicas restantes na playlist
Write-Host "`n19. Verificando musicas restantes na playlist..." -ForegroundColor Yellow
Invoke-SoapRequest -SoapAction "listSongsByPlaylist" -Body @"
    <tns:listSongsByPlaylistRequest>
      <playlist_id>1</playlist_id>
    </tns:listSongsByPlaylistRequest>
"@

Write-Host "`n`n================================" -ForegroundColor Cyan
Write-Host "Todos os testes foram executados!" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Dicas:" -ForegroundColor Yellow
Write-Host "  - Acesse o WSDL em: http://localhost:8000/soap?wsdl" -ForegroundColor White
Write-Host "  - Veja exemplos em: SOAP_API_EXAMPLES.md" -ForegroundColor White
Write-Host "  - Use SOAP UI ou Postman para testes interativos`n" -ForegroundColor White
