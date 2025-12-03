# Teste simples da API SOAP

Write-Host "Testando SOAP API..." -ForegroundColor Cyan

# Teste FindAll Music
Write-Host "`nTestando FindAll Music..." -ForegroundColor Yellow

$headers = @{
    "Content-Type" = "text/xml; charset=utf-8"
    "SOAPAction" = '"FindAll"'
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
    $response = Invoke-WebRequest -Uri "http://localhost:8080/music" -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "✓ Sucesso! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Resposta:"
    Write-Host $response.Content
} catch {
    Write-Host "✗ Erro:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Resposta do servidor:"
        Write-Host $responseBody
    }
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
