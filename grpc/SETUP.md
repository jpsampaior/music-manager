# 🚀 Guia Completo de Instalação - Music Manager Go

## ⚠️ Pré-requisitos Necessários

Para executar este projeto, você precisa instalar:

### 1. Go (Golang)

**Download Manual (Recomendado):**
1. Acesse: https://go.dev/dl/
2. Baixe o instalador para Windows (arquivo `.msi`)
3. Execute o instalador
4. Aceite as configurações padrão
5. Após a instalação, **feche e reabra o terminal**
6. Verifique: `go version`

**Via Chocolatey (como Administrador):**
```powershell
# Abra PowerShell como Administrador
choco install golang -y
```

### 2. Protocol Buffer Compiler (protoc)

**✅ JÁ INSTALADO!** O protoc foi instalado em: `%USERPROFILE%\protoc\bin`

Se precisar reinstalar manualmente:
1. Acesse: https://github.com/protocolbuffers/protobuf/releases
2. Baixe: `protoc-XX.X-win64.zip`
3. Extraia para: `C:\protoc`
4. Adicione ao PATH: `C:\protoc\bin`

### 3. Plugins Go para protoc

**Após instalar o Go**, execute:
```powershell
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Estes comandos instalam os plugins em: `%USERPROFILE%\go\bin`

### 4. Adicionar Go\bin ao PATH

Adicione manualmente ao PATH do usuário:
- `%USERPROFILE%\go\bin`

Ou via PowerShell:
```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";$env:USERPROFILE\go\bin", "User")
```

## 📋 Verificação da Instalação

Abra um **NOVO terminal PowerShell** e execute:

```powershell
# Deve retornar versões, não erros
go version
protoc --version
protoc-gen-go --version
protoc-gen-go-grpc --version
```

Se todos retornarem versões, você está pronto! ✅

## 🏗️ Configuração do Projeto

### 1. Configure as variáveis de ambiente

```powershell
# Copie o template
Copy-Item .env.example .env

# Edite o arquivo .env e adicione suas credenciais Supabase
notepad .env
```

Preencha:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
GRPC_PORT=5000
```

### 2. Instale as dependências Go

```powershell
go mod download
go mod tidy
```

### 3. Gere o código a partir dos arquivos proto

```powershell
.\generate.ps1
# ou
generate.bat
```

### 4. Execute o servidor

```powershell
go run cmd/server/main.go
```

O servidor gRPC estará rodando em: `localhost:5000`

## 🎯 Comandos Úteis

```powershell
# Gerar código proto
.\generate.ps1

# Executar servidor
go run cmd/server/main.go

# Compilar para produção
go build -o music-manager-server.exe cmd/server/main.go

# Executar binário compilado
.\music-manager-server.exe

# Instalar dependências
go mod download

# Atualizar dependências
go mod tidy

# Ver dependências
go list -m all
```

## 🐛 Troubleshooting

### "go não é reconhecido..."
- Instale o Go: https://go.dev/dl/
- Reinicie o terminal após a instalação

### "protoc não é reconhecido..."
- Execute: `$env:Path += ";$env:USERPROFILE\protoc\bin"`
- Ou adicione manualmente ao PATH do sistema

### "protoc-gen-go não é reconhecido..."
- Execute: `go install google.golang.org/protobuf/cmd/protoc-gen-go@latest`
- Adicione `%USERPROFILE%\go\bin` ao PATH

### Chocolatey precisa de admin
- Use os métodos de download manual
- Ou execute PowerShell como Administrador

### Erro de conexão com Supabase
- Verifique suas credenciais no arquivo `.env`
- Confirme que as tabelas existem no Supabase

## 📚 Próximos Passos

1. ✅ Instale Go
2. ✅ Protoc já está instalado
3. Instale os plugins Go para protoc
4. Configure o arquivo `.env`
5. Gere o código proto
6. Execute o servidor
7. Teste com grpcurl ou um cliente gRPC

## 🔗 Links Úteis

- Go Download: https://go.dev/dl/
- Protocol Buffers: https://protobuf.dev/
- gRPC Go: https://grpc.io/docs/languages/go/
- Supabase: https://supabase.com/docs
