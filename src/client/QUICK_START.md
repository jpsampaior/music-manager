# 🚀 Guia Rápido - Cliente de Streaming de Músicas

## ⚡ Início Rápido

### 1. Instalação de Dependências

```bash
npm install
```

Foram adicionadas as dependências necessárias:
- `axios` - para requisições REST
- `@apollo/client` - para GraphQL
- `cross-fetch` - para fetch em Node.js
- `soap` - já estava, para SOAP

### 2. Verificar se o Servidor está Rodando

```bash
# Terminal 1: Iniciar o servidor
npm run start:dev
```

O servidor deve estar disponível em:
- **REST**: http://localhost:3000
- **GraphQL**: http://localhost:3000/graphql
- **SOAP**: Conforme configurado

### 3. Executar Cliente

Em outro terminal:

```bash
# Ver exemplos de uso
npm run client:examples

# Executar testes de carga
npm run client:load-test

# Teste de estresse (carga progressiva)
npm run client:stress

# Com número customizado de requisições
npm run client:load-test -- --requests=500
```

## 📁 Estrutura do Cliente

```
src/client/
├── music-streaming.client.ts    # 🔧 Cliente principal
├── client-examples.ts            # 📚 Exemplos de uso
├── load-test.ts                  # 📊 Testes de carga
├── cli.ts                        # ⚡ Interface de linha de comando
├── index.ts                      # 📦 Exportações
└── CLIENT_README.md              # 📖 Documentação completa
```

## 🔍 Exemplos Rápidos

### Usar o Cliente Diretamente

```typescript
import { MusicStreamingClient } from './src/client/music-streaming.client';

// Criar cliente
const client = new MusicStreamingClient();

// REST - Listar usuários
const users = await client.restListAllUsers();
console.log(users);

// GraphQL - Listar músicas
const musics = await client.graphqlListAllMusics();
console.log(musics);

// SOAP - Listar playlists
const playlists = await client.soapListUserPlaylists(1);
console.log(playlists);
```

### Executar Testes de Carga

```typescript
import { LoadTester } from './src/client/load-test';

const tester = new LoadTester();

// Teste completo com 100 requisições
await tester.runFullLoadTest(100);

// Teste de estresse (10, 50, 100, 200, 500 requisições)
await tester.runStressTest();
```

### Verificar Saúde dos Serviços

```typescript
import { MusicStreamingClient } from './src/client/music-streaming.client';

const client = new MusicStreamingClient();
const health = await client.healthCheck();

console.log(health);
// { rest: true, graphql: true, soap: true }
```

## 📋 As 5 Consultas Implementadas

### 1. Listar todos os usuários

```typescript
// REST
const users = await client.restListAllUsers();

// GraphQL
const users = await client.graphqlListAllUsers();

// SOAP
const users = await client.soapListAllUsers();
```

### 2. Listar todas as músicas

```typescript
// REST
const musics = await client.restListAllMusics();

// GraphQL
const musics = await client.graphqlListAllMusics();

// SOAP
const musics = await client.soapListAllMusics();
```

### 3. Listar playlists de um usuário

```typescript
// REST
const playlists = await client.restListUserPlaylists(1);

// GraphQL
const playlists = await client.graphqlListUserPlaylists(1);

// SOAP
const playlists = await client.soapListUserPlaylists(1);
```

### 4. Listar músicas de uma playlist

```typescript
// REST
const musics = await client.restListPlaylistMusics(1);

// GraphQL
const musics = await client.graphqlListPlaylistMusics(1);

// SOAP
const musics = await client.soapListPlaylistMusics(1);
```

### 5. Listar playlists que contêm uma música

```typescript
// REST
const playlists = await client.restListPlaylistsByMusic(1);

// GraphQL
const playlists = await client.graphqlListPlaylistsByMusic(1);

// SOAP
const playlists = await client.soapListPlaylistsByMusic(1);
```

## 📊 Entender os Testes de Carga

### Resultado Exemplo

```
⏱️  Testando REST       - Listar Usuários (100 req)....✅
   Tempo médio: 12.45ms | Req/s: 80.32
   Min: 10.23ms | Max: 45.67ms | P95: 18.90ms
```

**O que significa:**

- **Tempo médio**: Média aritmética de todas as requisições
- **Req/s**: Quantas requisições por segundo
- **Min/Max**: Tempos mínimo e máximo
- **P95**: 95% das requisições foram mais rápidas que isso

### Interpretação do Ranking

```
🏆 RANKING DE TECNOLOGIAS

1°        REST            12.89              78.24
🥇 REST é mais rápido

2°        GraphQL         18.99              52.82
🥈 GraphQL é intermediário

3°        SOAP            46.85              21.36
🥉 SOAP é mais lento
```

REST é **~47% mais rápido** que GraphQL e **~3.6x mais rápido** que SOAP!

## 🔧 Configuração Customizada

```typescript
import { MusicStreamingClient } from './src/client/music-streaming.client';

const client = new MusicStreamingClient({
  rest: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000,  // Aumentar timeout
  },
  graphql: {
    url: 'http://localhost:3000/graphql',
    timeout: 10000,
  },
  soap: {
    url: 'http://localhost:8000/soap',
    wsdlUrl: 'http://localhost:3000/service.wsdl',
    timeout: 10000,
  },
});
```

## 🐛 Troubleshooting

### Erro: "Cannot connect to localhost:3000"

```bash
# Verificar se o servidor está rodando
npm run start:dev

# Em outro terminal, testar a conexão
curl http://localhost:3000/user
```

### Erro: "GraphQL endpoint not found"

```bash
# Verificar se GraphQL está disponível
curl http://localhost:3000/graphql
```

### Erro: "WSDL not found"

```bash
# Verificar se o arquivo WSDL existe
curl http://localhost:3000/service.wsdl
```

### Timeout demora muito

Aumentar o timeout na configuração do cliente:

```typescript
const client = new MusicStreamingClient({
  rest: { timeout: 15000 },      // 15 segundos
  graphql: { timeout: 15000 },
  soap: { timeout: 15000 },
});
```

## ✅ Checklist

Antes de usar o cliente, verifique:

- [ ] Node.js instalado (v14+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor rodando (`npm run start:dev`)
- [ ] Banco de dados Supabase conectado
- [ ] Dados de teste inseridos
- [ ] REST endpoint respondendo (`curl http://localhost:3000/user`)
- [ ] GraphQL endpoint respondendo
- [ ] SOAP endpoint respondendo

## 📖 Documentação Completa

Para documentação detalhada, veja: [CLIENT_README.md](./CLIENT_README.md)

## 🎯 Próximos Passos

1. ✅ Executar exemplos: `npm run client:examples`
2. 📊 Rodar testes de carga: `npm run client:load-test`
3. 💪 Teste de estresse: `npm run client:stress`
4. 📈 Analisar resultados
5. 🔍 Comparar tecnologias

## 📞 Suporte

Se tiver problemas:

1. Verifique se o servidor está rodando
2. Verifique os logs do servidor
3. Aumente o timeout do cliente
4. Verifique a conexão de rede
5. Verifique o arquivo CLIENT_README.md

---

**Desenvolvido para comparação de tecnologias de invocação remota** 🚀
