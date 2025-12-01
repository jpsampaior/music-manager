# 🎵 Cliente - Serviço de Streaming de Músicas

Cliente TypeScript completo para testar e comparar as 3 tecnologias de invocação remota implementadas: **REST**, **GraphQL** e **SOAP**.

## 📋 Funcionalidades

O cliente implementa as 5 consultas principais solicitadas para todas as tecnologias:

1. **Listar todos os usuários** - `GET /user` (REST) / `query users` (GraphQL) / `FindAllUsers` (SOAP)
2. **Listar todas as músicas** - `GET /music` (REST) / `query musics` (GraphQL) / `FindAllMusics` (SOAP)
3. **Listar playlists de um usuário** - `GET /user/:id/playlists` (REST) / `query user playlists` (GraphQL) / `FindUserPlaylists` (SOAP)
4. **Listar músicas de uma playlist** - `GET /playlist/:id/musics` (REST) / `query playlist musics` (GraphQL) / `FindPlaylistMusics` (SOAP)
5. **Listar playlists que contêm uma música** - `GET /music/:id/playlists` (REST) / `query music playlists` (GraphQL) / `FindPlaylistsByMusic` (SOAP)

## 🚀 Como Usar

### 1. Instalação de Dependências

Instale os pacotes necessários (já listados em `package.json`):

```bash
npm install
```

Dependências principais:
- `axios` - para REST API
- `@apollo/client` - para GraphQL
- `soap` - para SOAP
- `cross-fetch` - para fetch em Node.js

### 2. Uso Básico do Cliente

```typescript
import { MusicStreamingClient } from './src/client/music-streaming.client';

const client = new MusicStreamingClient();

// REST
const users = await client.restListAllUsers();
const musics = await client.restListAllMusics();

// GraphQL
const gqlUsers = await client.graphqlListAllUsers();
const userPlaylists = await client.graphqlListUserPlaylists(1);

// SOAP
const soapUsers = await client.soapListAllUsers();
const soapMusics = await client.soapListAllMusics();
```

### 3. Executar Exemplos

```bash
# Compilar TypeScript
npm run build

# Executar exemplos de uso
npm run client:examples

# Executar testes de carga (100 requisições)
npm run client:load-test

# Executar teste de estresse (carga progressiva)
npm run client:stress

# Executar teste de carga com 500 requisições
npm run client:load-test -- --requests=500
```

## 📊 Testes de Carga

O cliente inclui um sistema completo de testes de carga (`LoadTester`) que compara o desempenho das 3 tecnologias.

### Métricas Coletadas

- ⏱️ **Tempo médio de resposta** (ms)
- 📈 **Requisições por segundo (RPS)**
- ✅ **Taxa de sucesso** (%)
- 🎯 **Tempo mínimo e máximo**
- 📊 **P95 e P99** (percentis)
- ❌ **Taxa de erro**

### Exemplo de Saída

```
🚀 TESTE DE CARGA COMPLETO

📊 Requisições por teste: 100

════════════════════════════════════════════════════════════════════════════════════════

⏱️  Testando REST       - Listar Usuários (100 req)....✅
   Tempo médio: 12.45ms | Req/s: 80.32
   Min: 10.23ms | Max: 45.67ms | P95: 18.90ms

⏱️  Testando GraphQL    - Listar Usuários (100 req)....✅
   Tempo médio: 18.92ms | Req/s: 52.85
   Min: 15.34ms | Max: 62.15ms | P95: 28.45ms

⏱️  Testando SOAP       - Listar Usuários (100 req)....✅
   Tempo médio: 45.23ms | Req/s: 22.11
   Min: 40.12ms | Max: 120.45ms | P95: 65.89ms

════════════════════════════════════════════════════════════════════════════════════════

📊 RELATÓRIO COMPARATIVO COMPLETO

════════════════════════════════════════════════════════════════════════════════════════

🔹 REST

Operação                           Tempo Médio (ms)   Req/s        Taxa Sucesso   P95 (ms)
───────────────────────────────────────────────────────────────────────────────────────────
Listar Usuários                    12.45              80.32        100.0%         18.90
Listar Músicas                     13.87              72.10        100.0%         20.34
Playlists do Usuário (ID=1)        11.23              89.05        100.0%         16.45
Músicas da Playlist (ID=1)         14.56              68.72        100.0%         21.90
Playlists com Música (ID=1)        12.34              81.04        100.0%         18.67

─────────────────────────────────────────────────────────────────────────────────────────
MÉDIA                              12.89              78.24        100.0%         19.25

🔹 GraphQL

Operação                           Tempo Médio (ms)   Req/s        Taxa Sucesso   P95 (ms)
───────────────────────────────────────────────────────────────────────────────────────────
Listar Usuários                    18.92              52.85        100.0%         28.45
Listar Músicas                     19.34              51.72        100.0%         29.12
Playlists do Usuário (ID=1)        17.45              57.32        100.0%         26.78
Músicas da Playlist (ID=1)         20.56              48.64        100.0%         31.23
Playlists com Música (ID=1)        18.67              53.57        100.0%         28.12

─────────────────────────────────────────────────────────────────────────────────────────
MÉDIA                              18.99              52.82        100.0%         28.74

🔹 SOAP

Operação                           Tempo Médio (ms)   Req/s        Taxa Sucesso   P95 (ms)
───────────────────────────────────────────────────────────────────────────────────────────
Listar Usuários                    45.23              22.11        100.0%         65.89
Listar Músicas                     48.67              20.55        100.0%         71.34
Playlists do Usuário (ID=1)        46.89              21.33        100.0%         68.90
Músicas da Playlist (ID=1)         47.34              21.12        100.0%         69.67
Playlists com Música (ID=1)        46.12              21.67        100.0%         67.45

─────────────────────────────────────────────────────────────────────────────────────────
MÉDIA                              46.85              21.36        100.0%         68.65

──────────────────────────────────────────────────────────────────────────────────────────

🏆 RANKING DE TECNOLOGIAS

Posição   Tecnologia      Tempo Médio (ms)   Req/s Médio
──────────────────────────────────────────────────────────────────────────────────────────
1°        REST            12.89              78.24
🥇 REST é mais rápido

2°        GraphQL         18.99              52.82
🥈 GraphQL é intermediário

3°        SOAP            46.85              21.36
🥉 SOAP é mais lento

────────────────────────────────────────────────────────────────────────────────────────

📌 ESTATÍSTICAS GERAIS

Total de requisições: 1500
Total de sucessos: 1500
Total de falhas: 0
Tempo médio geral: 26.24ms
Req/s médio geral: 50.81

════════════════════════════════════════════════════════════════════════════════════════
✅ Relatório completo gerado!
```

### Teste de Estresse

Simula aumento progressivo de carga:

```bash
npm run client:stress
```

Aumenta de 10 → 50 → 100 → 200 → 500 requisições sucessivamente.

## 🏗️ Estrutura do Projeto

```
src/client/
├── music-streaming.client.ts    # Cliente principal (REST, GraphQL, SOAP)
├── client-examples.ts            # Exemplos de uso
├── load-test.ts                  # Testes de carga comparativos
├── index.ts                      # Exportações
└── CLIENT_README.md              # Este arquivo
```

## 🔧 Configuração

Configure os URLs via objeto de configuração:

```typescript
import { MusicStreamingClient } from './src/client/music-streaming.client';

const client = new MusicStreamingClient({
  rest: {
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
  },
  graphql: {
    url: 'http://localhost:3000/graphql',
    timeout: 5000,
  },
  soap: {
    url: 'http://localhost:8000/soap',
    wsdlUrl: 'http://localhost:3000/service.wsdl',
    timeout: 5000,
  },
});
```

## 📝 Scripts no package.json

Adicione ao seu `package.json`:

```json
{
  "scripts": {
    "client:examples": "ts-node src/client/client-examples.ts",
    "client:load-test": "ts-node src/client/load-test.ts",
    "client:stress": "ts-node src/client/load-test.ts --stress",
    "client:health-check": "ts-node src/client/music-streaming.client.ts"
  }
}
```

## 🎯 Casos de Uso

### 1. Desenvolvimento

Teste o cliente durante o desenvolvimento:

```typescript
const client = new MusicStreamingClient();
const users = await client.restListAllUsers();
console.log(users);
```

### 2. Teste de Performance

Compare qual tecnologia oferece melhor performance:

```bash
npm run client:load-test
```

### 3. Teste de Estresse

Simule alta carga para encontrar limites:

```bash
npm run client:stress
```

### 4. Verificação de Saúde

Verifique se todos os serviços estão operacionais:

```typescript
const client = new MusicStreamingClient();
const health = await client.healthCheck();
console.log(health);
// { rest: true, graphql: true, soap: true }
```

## 🔍 API Completa

### MusicStreamingClient

#### Métodos REST

```typescript
// Listar
await client.restListAllUsers(): Promise<User[]>
await client.restListAllMusics(): Promise<Music[]>
await client.restListUserPlaylists(userId: number): Promise<Playlist[]>
await client.restListPlaylistMusics(playlistId: number): Promise<Music[]>
await client.restListPlaylistsByMusic(musicId: number): Promise<Playlist[]>
```

#### Métodos GraphQL

```typescript
// Listar
await client.graphqlListAllUsers(): Promise<User[]>
await client.graphqlListAllMusics(): Promise<Music[]>
await client.graphqlListUserPlaylists(userId: number): Promise<Playlist[]>
await client.graphqlListPlaylistMusics(playlistId: number): Promise<Music[]>
await client.graphqlListPlaylistsByMusic(musicId: number): Promise<Playlist[]>
```

#### Métodos SOAP

```typescript
// Necessário inicializar antes
await client.initializeSoapClient()

// Listar
await client.soapListAllUsers(): Promise<User[]>
await client.soapListAllMusics(): Promise<Music[]>
await client.soapListUserPlaylists(userId: number): Promise<Playlist[]>
await client.soapListPlaylistMusics(playlistId: number): Promise<Music[]>
await client.soapListPlaylistsByMusic(musicId: number): Promise<Playlist[]>
```

#### Métodos Utilitários

```typescript
// Health check
await client.healthCheck(): Promise<{rest: boolean; graphql: boolean; soap: boolean}>
```

## 🚨 Troubleshooting

### Conexão Recusada

```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Solução**: Verifique se o servidor está rodando

```bash
npm run start:dev
```

### Timeout

```
Error: timeout of 5000ms exceeded
```

**Solução**: Aumentar timeout na configuração

```typescript
const client = new MusicStreamingClient({
  rest: { baseUrl: 'http://localhost:3000', timeout: 10000 }
});
```

### Erro SOAP

```
Error: Failed to fetch WSDL
```

**Solução**: Verifique se o arquivo WSDL está disponível no servidor

```bash
curl http://localhost:3000/service.wsdl
```

### Taxa de Sucesso Baixa

- Verificar logs do servidor: `npm run start:dev`
- Verificar disponibilidade de recursos
- Verificar conexão de rede
- Reduzir número de requisições concorrentes

## 📚 Referências

- [REST API Examples](./REST_API_EXAMPLES.md)
- [GraphQL Examples](./GRAPHQL_EXAMPLES.md)
- [SOAP Implementation](./SOAP_IMPLEMENTATION.md)
- [Schema GraphQL](./src/schema.gql)

## ✅ Checklist de Uso

- [ ] Servidor rodando em localhost:3000
- [ ] GraphQL endpoint disponível em /graphql
- [ ] SOAP endpoint disponível em /soap
- [ ] WSDL disponível em /service.wsdl
- [ ] Banco de dados Supabase conectado
- [ ] Dados de teste criados

## 🎓 Conceitos Comparados

### REST vs GraphQL vs SOAP

| Aspecto | REST | GraphQL | SOAP |
|---------|------|---------|------|
| Complexidade | Baixa | Média | Alta |
| Overhead | Baixo | Médio | Alto |
| Tamanho de Payload | Médio | Pequeno | Grande |
| Flexibilidade | Baixa | Alta | Média |
| Performance | Rápido | Rápido | Lento |
| Curva de Aprendizado | Fácil | Média | Difícil |
| Cache | Fácil | Difícil | Difícil |
| Segurança | Boa | Boa | Excelente |

## 📈 Próximos Passos

1. ✅ **Estender para gRPC** - Adicionar suporte a gRPC
2. 📊 **Persistência de Resultados** - Salvar resultados em CSV/JSON
3. 🔄 **Load Balancing** - Testar com múltiplos servidores
4. 🔐 **Autenticação** - Adicionar suporte a JWT/OAuth
5. 📡 **Monitoramento** - Integrar com ferramentas de APM
6. 🗺️ **Mapa de Calor** - Visualizar performance em tempo real

---

**Desenvolvido para comparação de tecnologias de invocação remota** 🚀

**Data**: Novembro 2025  
**Versão**: 1.0.0
