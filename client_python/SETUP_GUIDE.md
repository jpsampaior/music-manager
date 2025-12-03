# 🚀 Guia de Configuração - Cliente Python

Guia completo para configurar e usar o cliente Python do Music Manager.

## Pré-requisitos

- **Python 3.8+** instalado
- **pip** (geralmente vem com Python)
- **Servidor NestJS** rodando em `localhost:3000`

## Passo 1: Verificar Python

```powershell
python --version
pip --version
```

Certifique-se de que ambos retornam versões válidas.

## Passo 2: Instalar Dependências

### Opção A: Usar Script (Windows)
```powershell
cd client_python
.\setup.bat
# Escolha a opção 1 ou 3
```

### Opção B: Instalação Manual
```powershell
cd client_python
pip install -r requirements.txt
```

Dependências instaladas:
- **requests** ~2.31.0 - HTTP client (REST, GraphQL)
- **zeep** ~4.2.1 - SOAP client
- **grpcio** ~1.60.0 - gRPC runtime
- **grpcio-tools** ~1.60.0 - gRPC protocol buffers compiler
- **python-dotenv** ~1.0.0 - Carregar variáveis de ambiente

## Passo 3: Compilar Proto Files (Para gRPC)

### Opção A: Usar Script (Windows)
```powershell
.\setup.bat
# Escolha a opção 2 ou 3
```

### Opção B: Compilação Manual
```powershell
python -m grpc_tools.protoc `
  -I../../proto `
  --python_out=. `
  --pyi_out=. `
  --grpc_python_out=. `
  ../../proto/*.proto
```

Isso criará os seguintes arquivos:
- `user_pb2.py`, `user_pb2_grpc.py`
- `music_pb2.py`, `music_pb2_grpc.py`
- `playlist_pb2.py`, `playlist_pb2_grpc.py`

## Passo 4: Verificar Servidor

Certifique-se de que o servidor está rodando:

```powershell
# Em outro terminal
cd .. # volta para a raiz do projeto
npm run dev
```

Verifique que os endpoints estão respondendo:
```powershell
# REST
curl http://localhost:3000/user

# GraphQL
curl http://localhost:3000/graphql

# SOAP WSDL
curl http://localhost:3000/service.wsdl

# gRPC (porta 50051)
# Será testado automaticamente
```

## Passo 5: Usar o Cliente

### Opção A: Executar Exemplos
```powershell
python examples.py
```

Demonstra:
- REST: Listar usuários e músicas
- GraphQL: Listar playlists
- SOAP: Listar playlists com música
- gRPC: Operações em gRPC
- Health Check
- Fluxo completo

### Opção B: Testes de Carga
```powershell
python load_test.py
```

Executa 100 requisições por operação e compara:
- Tempo médio
- Percentis (P95, P99)
- Requisições por segundo
- Taxa de erro

### Opção C: Interface Interativa
```powershell
python cli.py
```

Menu com opções:
1. Usar REST
2. Usar GraphQL
3. Usar SOAP
4. Usar gRPC
5. Health Check
6. Comparar Tecnologias
0. Sair

### Opção D: Usar Programaticamente

```python
import asyncio
from music_streaming_client import MusicStreamingClient

async def main():
    client = MusicStreamingClient()
    
    # REST
    users = await client.rest_list_all_users()
    print(f"Usuários (REST): {users}")
    
    # GraphQL
    musics = await client.graphql_list_all_musics()
    print(f"Músicas (GraphQL): {musics}")
    
    # SOAP
    playlists = await client.soap_list_user_playlists(1)
    print(f"Playlists (SOAP): {playlists}")
    
    # gRPC (se compilado)
    try:
        users = await client.grpc_list_all_users()
        print(f"Usuários (gRPC): {users}")
    except:
        print("gRPC não compilado (opcional)")

asyncio.run(main())
```

## Estrutura de Arquivos

```
client_python/
├── music_streaming_client.py    # Cliente principal (20 métodos)
├── load_test.py                 # Framework de testes de carga
├── examples.py                  # 6 exemplos práticos
├── cli.py                       # Interface interativa
├── setup.py                     # Setup script (Python)
├── setup.bat                    # Setup script (Windows)
├── requirements.txt             # Dependências pip
├── README.md                    # Documentação completa
├── INDEX.md                     # Índice rápido
├── SETUP_GUIDE.md              # Este arquivo
├── .env.example                # Configuração exemplo
├── __init__.py                 # Package init
└── Proto files (após compilação)
    ├── user_pb2.py
    ├── user_pb2_grpc.py
    ├── music_pb2.py
    ├── music_pb2_grpc.py
    ├── playlist_pb2.py
    └── playlist_pb2_grpc.py
```

## Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'requests'"

**Solução**: Instalar dependências
```powershell
pip install -r requirements.txt
```

### Erro: "Connection refused" (ECONNREFUSED)

**Solução**: Iniciar servidor
```powershell
npm run dev  # Em outro terminal na raiz do projeto
```

### Erro: "Proto files not found" (gRPC)

**Solução**: Compilar proto files
```powershell
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
```

Ou usar o script:
```powershell
.\setup.bat
# Escolha opção 2
```

### Erro: "WSDL not found" (SOAP)

**Solução**: Verificar se servidor está respondendo
```powershell
curl http://localhost:3000/service.wsdl
```

Se não responder, verifique:
1. Servidor rodando: `npm run dev`
2. URL correta em `ClientConfig`

### Erro: "ModuleNotFoundError: No module named 'grpc'"

**Solução**: Instalar grpcio (já incluído em requirements.txt)
```powershell
pip install grpcio grpcio-tools
```

### Erro: "Proto module not found" ao usar gRPC

**Solução**: Compilar proto files (veja acima)

## Configuração Customizada

Editar `music_streaming_client.py`:

```python
from music_streaming_client import ClientConfig, MusicStreamingClient

config = ClientConfig(
    rest_base_url="http://localhost:3000",
    rest_timeout=5000,
    graphql_url="http://localhost:3000/graphql",
    graphql_timeout=8000,
    soap_wsdl_url="http://localhost:3000/service.wsdl",
    soap_timeout=5000,
    grpc_url="localhost:50051",
    grpc_timeout=3000
)

client = MusicStreamingClient(config)
```

## Performance Esperada

| Tecnologia | Tempo Médio | Req/s  | Observações |
|------------|-----------|--------|------------|
| gRPC       | ~0.6ms    | 2,400  | ⚡ Mais rápido |
| REST       | ~4.5ms    | 220    | Baseline |
| SOAP       | ~4.7ms    | 210    | XML overhead |
| GraphQL    | ~9ms      | 110    | Query parsing |

Resultados podem variar baseado em:
- Carga do sistema
- Qualidade da rede
- Tamanho dos dados retornados

## Próximos Passos

1. **Explorar as Tecnologias**
   - Executar `examples.py`
   - Testar cada uma individualmente em `cli.py`

2. **Medir Performance**
   - Rodar `load_test.py`
   - Comparar resultados com TypeScript

3. **Integrar em Seu Código**
   - Importar `MusicStreamingClient`
   - Usar qualquer das 20 operações
   - Escolher tecnologia baseado em seus requisitos

4. **Adicionar Funcionalidades**
   - Cache de resultados
   - Retry logic
   - Logging melhorado
   - Autenticação (JWT)

## Referências

- **TypeScript Original**: `../src/client/music-streaming.client.ts`
- **Proto Files**: `../proto/*.proto`
- **Servidor**: `../src/app.controller.ts`
- **Documentação Zeep**: https://docs.python-zeep.org/
- **Documentação gRPC**: https://grpc.io/docs/languages/python/

## Suporte

Se encontrar problemas:

1. **Verifique logs**: Todos os erros são impressos em stdout
2. **Verifique servidor**: `curl http://localhost:3000/user`
3. **Reinstale dependências**: `pip install -r requirements.txt --force-reinstall`
4. **Compile proto files novamente**: `python -m grpc_tools.protoc ...`

---

**Status**: ✅ Setup completo
**Versão**: 1.0.0
**Data**: Dezembro 2, 2025
**Compatível com**: TypeScript client (100% feature parity)
