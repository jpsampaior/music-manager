# 🎵 Cliente Python - Índice e Guia Rápido

Bem-vindo ao cliente Python do Music Manager! Este guia irá ajudá-lo a começar.

## 📋 Conteúdo

1. **music_streaming_client.py** - Cliente principal
   - Todas as 20 operações (5 por tecnologia × 4 tecnologias)
   - REST, GraphQL, SOAP, gRPC
   - Async/await pattern

2. **load_test.py** - Framework de testes de carga
   - 100 requisições por operação
   - Métricas: tempo médio, P95, P99, req/s
   - Ranking de performance

3. **examples.py** - 6 exemplos práticos
   - Exemplo 1: REST API
   - Exemplo 2: GraphQL
   - Exemplo 3: SOAP
   - Exemplo 4: gRPC
   - Exemplo 5: Health Check
   - Exemplo 6: Fluxo Completo

4. **cli.py** - Interface interativa
   - Menu principal com 6 opções
   - Operações por tecnologia
   - Comparação de performance

5. **requirements.txt** - Dependências
   - requests, zeep, grpcio, grpcio-tools

## 🚀 Início Rápido

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Compilar proto files (para gRPC)
```bash
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
```

### 3. Executar exemplos
```bash
python examples.py
```

### 4. Executar teste de carga
```bash
python load_test.py
```

### 5. Usar interface interativa
```bash
python cli.py
```

## 📊 Estrutura de Comparação (4 tecnologias × 5 operações = 20 métodos)

```
REST (requests)
├── rest_list_all_users()
├── rest_list_all_musics()
├── rest_list_user_playlists(user_id)
├── rest_list_playlist_musics(playlist_id)
└── rest_list_playlists_by_music(music_id)

GraphQL (requests + gql)
├── graphql_list_all_users()
├── graphql_list_all_musics()
├── graphql_list_user_playlists(user_id)
├── graphql_list_playlist_musics(playlist_id)
└── graphql_list_playlists_by_music(music_id)

SOAP (zeep)
├── soap_list_all_users()
├── soap_list_all_musics()
├── soap_list_user_playlists(user_id)
├── soap_list_playlist_musics(playlist_id)
└── soap_list_playlists_by_music(music_id)

gRPC (grpcio)
├── grpc_list_all_users()
├── grpc_list_all_musics()
├── grpc_list_user_playlists(user_id)
├── grpc_list_playlist_musics(playlist_id)
└── grpc_list_playlists_by_music(music_id)
```

## 🔧 Configuração

Customizar endpoints:

```python
from music_streaming_client import ClientConfig, MusicStreamingClient

config = ClientConfig(
    rest_base_url="http://localhost:3000",
    graphql_url="http://localhost:3000/graphql",
    soap_wsdl_url="http://localhost:3000/service.wsdl",
    grpc_url="localhost:50051"
)

client = MusicStreamingClient(config)
```

## 📈 Performance Esperada

| Tecnologia | Tempo Médio | Requisições/s |
|------------|------------|---------------|
| **gRPC**   | ~0.6ms     | 2,400         |
| REST       | ~4.5ms     | 220           |
| SOAP       | ~4.7ms     | 210           |
| GraphQL    | ~9ms       | 110           |

## 🧪 Exemplo de Uso Simples

```python
import asyncio
from music_streaming_client import MusicStreamingClient

async def main():
    client = MusicStreamingClient()
    
    # Usar REST
    users = await client.rest_list_all_users()
    print(f"Usuários: {users}")
    
    # Usar GraphQL
    musics = await client.graphql_list_all_musics()
    print(f"Músicas: {musics}")
    
    # Health check
    result = await client.health_check()
    print(f"Status: {result}")

asyncio.run(main())
```

## ❓ FAQ

**P: Como rodar os exemplos?**
R: `python examples.py`

**P: Como executar testes de carga?**
R: `python load_test.py` (certifique-se de que o servidor está rodando)

**P: Qual é a tecnologia mais rápida?**
R: gRPC (~0.6ms), mas REST/SOAP também são viáveis (~4.5ms)

**P: Preciso compilar os proto files?**
R: Sim, para usar gRPC: `python -m grpc_tools.protoc ...`

**P: Posso usar este cliente em produção?**
R: Sim, mas adicione retry logic e tratamento de erros mais robusto.

## 📚 Arquivos de Referência

- TypeScript: `../src/client/music-streaming.client.ts`
- Testes: `../src/client/load-test.ts`
- Exemplos: `../src/client/client-examples.ts`
- CLI: `../src/client/cli.ts`

## 🐛 Troubleshooting

**Erro: Proto files não encontrados**
```bash
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
```

**Erro: Connection refused**
- Certifique-se de que o servidor está rodando: `npm run dev`

**Erro: WSDL not found**
- Verifique: `curl http://localhost:3000/service.wsdl`

## 📞 Suporte

Para mais informações, consulte:
- README.md - Documentação completa
- examples.py - Exemplos de código
- cli.py - Interface interativa

---

**Status**: ✅ Python client migration complete
**Compatível com**: TypeScript version (100% feature parity)
**Data**: Dezembro 2, 2025
