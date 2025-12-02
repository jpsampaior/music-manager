# Cliente de Música Streaming em Python 🎵

Este é o equivalente em Python do cliente TypeScript de música streaming. Suporta as 4 principais tecnologias de API:
- **REST** (HTTP JSON)
- **GraphQL** (Query language)
- **SOAP** (XML Web Services)
- **gRPC** (High-performance RPC)

## Estrutura do Projeto

```
client_python/
├── music_streaming_client.py    # Cliente principal com todas as 20 operações
├── load_test.py                 # Framework de testes de carga (100 req/op)
├── examples.py                  # 6 exemplos de uso das tecnologias
├── cli.py                       # Interface interativa por linha de comando
├── requirements.txt             # Dependências Python
└── README.md                    # Este arquivo
```

## Instalação

### 1. Instalar Python 3.8+

```bash
# Verificar versão
python --version
```

### 2. Instalar dependências

```bash
pip install -r requirements.txt
```

Dependências:
- **requests** - Para REST e GraphQL
- **zeep** - Para SOAP
- **grpcio** - Para gRPC
- **grpcio-tools** - Ferramentas para compilar protobufs

### 3. Compilar arquivos gRPC (protobuf)

```bash
# Navegue até a pasta do projeto
cd client_python

# Compile os arquivos proto
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
```

Isso criará arquivos como:
- `music_pb2.py`, `music_pb2_grpc.py`
- `playlist_pb2.py`, `playlist_pb2_grpc.py`
- `user_pb2.py`, `user_pb2_grpc.py`

## Uso

### Exemplo 1: Executar os Exemplos

```bash
python examples.py
```

Demonstra:
- Usar REST para listar usuários
- Usar GraphQL para listar músicas
- Usar SOAP para listar playlists
- Usar gRPC para operações complexas
- Health check de todos os endpoints
- Fluxo completo combinando tecnologias

### Exemplo 2: Teste de Carga

```bash
# Antes, certifique-se de que o servidor está rodando
npm run dev  # Em outro terminal

# Execute o teste de carga
python load_test.py
```

O teste irá:
- Executar 100 requisições por operação
- Testar 5 operações × 4 tecnologias = 20 testes
- Mostrar métricas: tempo médio, P95, P99, req/s
- Gerar ranking de performance

### Exemplo 3: Interface Interativa (CLI)

```bash
python cli.py
```

Menu interativo com opções:
1. Usar REST
2. Usar GraphQL
3. Usar SOAP
4. Usar gRPC
5. Health Check
6. Comparar Tecnologias
0. Sair

### Exemplo 4: Visualizar Resultados em Texto + Gráficos

Existem 3 formas de visualizar os dados dos testes:

#### Opção A: Visualizador Integrado (RECOMENDADO)
```bash
python integrated_viewer.py
```
Menu com opções para:
- Ver dados em tabelas (texto)
- Visualizar os 8 gráficos PNG
- Exportar relatório completo
- Abrir outros visualizadores

#### Opção B: Apenas Dados em Texto
```bash
python view_data.py
```
Menu interativo para:
- Tabelas: Tempo por operação, Throughput, P95
- Comparações gerais
- Gráficos ASCII
- Estatísticas detalhadas
- Exportar CSV

#### Opção C: Apenas Gráficos PNG
```bash
python view_charts.py
```
Menu para:
- Abrir cada gráfico individual
- Abrir pasta de gráficos
- Visualizar em aplicativo padrão

#### Referência Rápida - Dados Completos
```bash
cat DADOS_COMPLETOS.txt
```
Contém todos os dados em formato texto legível com análises e recomendações.

### Gráficos Disponíveis (8 arquivos PNG em ./charts/)

1. **01_tempo_medio_por_operacao.png** - Tempo médio com escala logarítmica
2. **02_requisicoes_por_segundo.png** - Throughput com escala logarítmica
3. **03_comparacao_tempo_geral.png** - Ranking de performance (tempo)
4. **04_comparacao_req_per_sec.png** - Ranking de performance (throughput)
5. **05_radar_comparison.png** - Radar chart normalizado
6. **06_heatmap_tempo.png** - Heatmap: Tempo × Tecnologia × Operação
7. **07_heatmap_req_sec.png** - Heatmap: Throughput × Tecnologia × Operação
8. **08_ranking_geral.png** - Duplo ranking (tempo + throughput)

## Uso Programático

### Importar e criar cliente

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
    
    # Usar SOAP
    playlists = await client.soap_list_user_playlists(user_id=1)
    print(f"Playlists: {playlists}")
    
    # Usar gRPC
    playlist_musics = await client.grpc_list_playlist_musics(playlist_id=1)
    print(f"Músicas da playlist: {playlist_musics}")
    
    # Health check
    await client.health_check()

asyncio.run(main())
```

### Configuração customizada

```python
from music_streaming_client import MusicStreamingClient, ClientConfig

config = ClientConfig(
    rest_base_url="http://localhost:3000",
    graphql_url="http://localhost:3000/graphql",
    soap_wsdl_url="http://localhost:3000/service.wsdl",
    grpc_host="localhost",
    grpc_port=50051,
    timeout_rest=5000,
    timeout_graphql=8000,
    timeout_soap=5000,
    timeout_grpc=3000
)

client = MusicStreamingClient(config)
```

## Operações Suportadas

Cada tecnologia suporta 5 operações:

### 1. Listar todos os usuários
```python
users = await client.rest_list_all_users()
users = await client.graphql_list_all_users()
users = await client.soap_list_all_users()
users = await client.grpc_list_all_users()
```

### 2. Listar todas as músicas
```python
musics = await client.rest_list_all_musics()
musics = await client.graphql_list_all_musics()
musics = await client.soap_list_all_musics()
musics = await client.grpc_list_all_musics()
```

### 3. Listar playlists de um usuário
```python
playlists = await client.rest_list_user_playlists(user_id=1)
playlists = await client.graphql_list_user_playlists(user_id=1)
playlists = await client.soap_list_user_playlists(user_id=1)
playlists = await client.grpc_list_user_playlists(user_id=1)
```

### 4. Listar músicas de uma playlist
```python
musics = await client.rest_list_playlist_musics(playlist_id=1)
musics = await client.graphql_list_playlist_musics(playlist_id=1)
musics = await client.soap_list_playlist_musics(playlist_id=1)
musics = await client.grpc_list_playlist_musics(playlist_id=1)
```

### 5. Listar playlists que contêm uma música
```python
playlists = await client.rest_list_playlists_by_music(music_id=1)
playlists = await client.graphql_list_playlists_by_music(music_id=1)
playlists = await client.soap_list_playlists_by_music(music_id=1)
playlists = await client.grpc_list_playlists_by_music(music_id=1)
```

### Health Check
```python
await client.health_check()  # Retorna se todos os endpoints estão OK
```

## Modelos de Dados

```python
@dataclass
class User:
    id: int
    name: str
    age: int

@dataclass
class Music:
    id: int
    name: str
    artist: str

@dataclass
class Playlist:
    id: int
    name: str
```

## Tratamento de Erros

Todos os métodos fazem tratamento de erro e lançam exceções em caso de falha:

```python
try:
    users = await client.rest_list_all_users()
except Exception as error:
    print(f"Erro ao listar usuários: {error}")
```

## Performance

Resultados esperados (comparado com TypeScript):

| Tecnologia | Tempo Médio | Req/s |
|------------|------------|--------|
| gRPC       | ~0.6ms     | 2,400  |
| REST       | ~4.5ms     | 220    |
| SOAP       | ~4.7ms     | 210    |
| GraphQL    | ~9ms       | 110    |

## Requisitos do Servidor

O servidor NestJS deve estar rodando em:
- **REST**: `http://localhost:3000`
- **GraphQL**: `http://localhost:3000/graphql`
- **SOAP**: `http://localhost:3000/service.wsdl`
- **gRPC**: `localhost:50051`

## Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'X'"
Instale as dependências: `pip install -r requirements.txt`

### Erro: "Connection refused"
Certifique-se de que o servidor está rodando: `npm run dev`

### Erro: "Proto files not found"
Compile os arquivos proto:
```bash
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
```

### Erro: "WSDL not found"
Certifique-se de que o endpoint SOAP está disponível:
```bash
curl http://localhost:3000/service.wsdl
```

## Próximos Passos

- [ ] Adicionar autenticação (JWT)
- [ ] Adicionar cache de resultados
- [ ] Adicionar retry logic
- [ ] Adicionar métricas prometheus
- [ ] Adicionar testes unitários
- [ ] Documentação API completa

## Compatibilidade

- Python 3.8+
- Windows, macOS, Linux
- Async/await (asyncio)
- Type hints (Python 3.9+)

## Licença

MIT

## Autor

Cliente Python criado como equivalente do cliente TypeScript para o projeto Music Manager.
