# Guia de Instalação do Protocol Buffer Compiler (protoc)

## Método 1: Download Manual (Recomendado)

1. **Baixe o protoc para Windows:**
   - Acesse: https://github.com/protocolbuffers/protobuf/releases
   - Baixe o arquivo `protoc-<versão>-win64.zip` (exemplo: protoc-28.3-win64.zip)

2. **Extraia o arquivo:**
   - Extraia o conteúdo para uma pasta, por exemplo: `C:\protoc`

3. **Adicione ao PATH:**
   - Abra "Configurações do Sistema" → "Variáveis de Ambiente"
   - Em "Variáveis do Sistema", encontre `Path` e clique em "Editar"
   - Clique em "Novo" e adicione: `C:\protoc\bin`
   - Clique em "OK" em todas as janelas

4. **Verifique a instalação:**
   - Abra um NOVO terminal PowerShell (importante: novo terminal)
   - Execute: `protoc --version`

## Método 2: Via Chocolatey (como Administrador)

Abra o PowerShell como Administrador e execute:

```powershell
choco install protoc -y
```

## Método 3: Via Scoop (alternativa sem admin)

```powershell
# Instalar Scoop (se não tiver)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# Instalar protoc
scoop install protobuf
```

## Após a Instalação

1. **Instale os plugins Go para protoc:**
   ```powershell
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
   ```

2. **Certifique-se de que o GOPATH/bin está no PATH:**
   - O diretório padrão é: `%USERPROFILE%\go\bin`
   - Adicione ao PATH se necessário

3. **Gere o código:**
   ```powershell
   .\generate.ps1
   ```

## Verificação

Execute estes comandos para verificar se tudo está instalado:

```powershell
protoc --version
protoc-gen-go --version
protoc-gen-go-grpc --version
go version
```

Todos devem retornar uma versão sem erros.
