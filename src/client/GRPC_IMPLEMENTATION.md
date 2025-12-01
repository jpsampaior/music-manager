# 🚀 Adicionar Suporte a gRPC (Próximo Passo)

> Este arquivo descreve como estender o cliente para incluir suporte a gRPC.

## 📋 Visão Geral

O cliente atualmente suporta **REST**, **GraphQL** e **SOAP**. Adicionar **gRPC** completaria a comparação com mais uma tecnologia moderna de alta performance.

## 🎯 Objetivo

Estender `MusicStreamingClient` para incluir métodos gRPC correspondentes às 5 operações principais.

## 📦 Dependências Necessárias

Já estão instaladas:
- `@grpc/grpc-js` - Cliente gRPC
- `@grpc/proto-loader` - Loader de arquivos .proto

## 🔧 Passos de Implementação

### 1. Criar Cliente gRPC

Adicionar em `music-streaming.client.ts`:

```typescript
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

export class MusicStreamingClient {
  private grpcClient: any = null;
  private grpcChannelPromise: Promise<any> | null = null;

  /**
   * Inicializar cliente gRPC
   */
  async initializeGrpcClient(): Promise<void> {
    if (this.grpcClient) return;

    const protoPath = path.join(__dirname, '../../proto/user.proto');
    
    const packageDefinition = await protoLoader.load(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const userProto = grpc.loadPackageDefinition(packageDefinition);
    
    const channel = new grpc.Channel(
      'localhost:5000',
      grpc.ChannelCredentials.createInsecure()
    );

    this.grpcClient = new userProto.UserService('localhost:5000', 
      grpc.credentials.createInsecure());
  }

  // ==================== gRPC Methods ====================

  /**
   * gRPC: Listar todos os usuários
   */
  async grpcListAllUsers(): Promise<User[]> {
    if (!this.grpcClient) await this.initializeGrpcClient();

    return new Promise((resolve, reject) => {
      this.grpcClient.FindAll({}, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response?.users || []);
      });
    });
  }

  /**
   * gRPC: Listar todas as músicas
   */
  async grpcListAllMusics(): Promise<Music[]> {
    if (!this.grpcClient) await this.initializeGrpcClient();

    return new Promise((resolve, reject) => {
      this.grpcClient.FindAllMusics({}, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response?.musics || []);
      });
    });
  }

  /**
   * gRPC: Listar playlists de um usuário
   */
  async grpcListUserPlaylists(userId: number): Promise<Playlist[]> {
    if (!this.grpcClient) await this.initializeGrpcClient();

    return new Promise((resolve, reject) => {
      this.grpcClient.FindUserPlaylists({ userId }, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response?.playlists || []);
      });
    });
  }

  /**
   * gRPC: Listar músicas de uma playlist
   */
  async grpcListPlaylistMusics(playlistId: number): Promise<Music[]> {
    if (!this.grpcClient) await this.initializeGrpcClient();

    return new Promise((resolve, reject) => {
      this.grpcClient.FindPlaylistMusics(
        { playlistId },
        (err: any, response: any) => {
          if (err) reject(err);
          else resolve(response?.musics || []);
        }
      );
    });
  }

  /**
   * gRPC: Listar playlists que contêm uma música
   */
  async grpcListPlaylistsByMusic(musicId: number): Promise<Playlist[]> {
    if (!this.grpcClient) await this.initializeGrpcClient();

    return new Promise((resolve, reject) => {
      this.grpcClient.FindPlaylistsByMusic(
        { musicId },
        (err: any, response: any) => {
          if (err) reject(err);
          else resolve(response?.playlists || []);
        }
      );
    });
  }
}
```

### 2. Adicionar Exemplos gRPC

Em `client-examples.ts`:

```typescript
/**
 * Exemplo 4: Executar todas as 5 consultas com gRPC
 */
async exampleGrpc() {
  console.log('\n⚡ EXEMPLO 4: gRPC\n');

  try {
    // 1. Listar todos os usuários
    console.log('1️⃣  Listando todos os usuários...');
    const users = await this.client.grpcListAllUsers();
    console.log(`   ✅ ${users.length} usuários encontrados`);
    console.log('   ', users.slice(0, 2));

    // ... (similar para os outros 4 exemplos)

    console.log('\n✅ Exemplo gRPC concluído!\n');
  } catch (error) {
    console.error('❌ Erro no exemplo gRPC:', error);
  }
}
```

### 3. Adicionar Testes de Carga gRPC

Em `load-test.ts`:

```typescript
async runFullLoadTest(numberOfRequests: number = 100) {
  // ... existing code ...

  const operations = [
    // ... existing operations ...
    {
      name: 'Listar Usuários',
      restFn: () => this.client.restListAllUsers(),
      graphqlFn: () => this.client.graphqlListAllUsers(),
      soapFn: () => this.client.soapListAllUsers(),
      grpcFn: () => this.client.grpcListAllUsers(),  // NOVO
    },
    // ... etc
  ];

  for (const op of operations) {
    await this.runLoadTest('REST', op.name, op.restFn, numberOfRequests);
    await this.runLoadTest('GraphQL', op.name, op.graphqlFn, numberOfRequests);
    await this.runLoadTest('SOAP', op.name, op.soapFn, numberOfRequests);
    await this.runLoadTest('gRPC', op.name, op.grpcFn, numberOfRequests);  // NOVO
  }

  this.generateReport();
}
```

## 🧪 Testar Implementação

```bash
# Depois de implementar os métodos acima:

npm run client:examples  # Verá exemplo gRPC
npm run client:load-test # Incluirá gRPC na comparação
npm run client:stress    # Teste de estresse com gRPC
```

## 📊 Resultado Esperado

Após implementar gRPC, a comparação ficaria assim:

```
🏆 RANKING DE TECNOLOGIAS

Posição   Tecnologia      Tempo Médio (ms)   Req/s Médio
──────────────────────────────────────────────────────────
1°        gRPC            8.23               121.50
🥇 gRPC é mais rápido

2°        REST            12.89              78.24
🥈 REST é intermediário-rápido

3°        GraphQL         18.99              52.82
🥉 GraphQL é intermediário

4°        SOAP            46.85              21.36
💤 SOAP é mais lento
```

## 📝 Notas Importantes

1. **Configuração Necessária**: Garantir que o servidor gRPC está rodando na porta 5000
2. **Proto Files**: Usar os arquivos `.proto` já presentes em `/proto`
3. **Async/Await**: gRPC em Node.js usa callbacks, precisa de wrapper Promises
4. **Erro Handling**: gRPC tem comportamento diferente de erro
5. **Performance**: gRPC deve ser o mais rápido (binário vs texto)

## ✅ Checklist de Implementação

- [ ] Adicionar métodos gRPC a `MusicStreamingClient`
- [ ] Adicionar exemplos em `ClientExamples`
- [ ] Adicionar testes em `LoadTester`
- [ ] Atualizar exports em `index.ts`
- [ ] Atualizar documentação
- [ ] Testar funcionalidade
- [ ] Testar performance
- [ ] Atualizar comparação de tecnologias

## 🎯 Estimativa de Esforço

- **Implementação**: 1-2 horas
- **Testes**: 30 minutos
- **Documentação**: 30 minutos
- **Total**: 2-3 horas

## 📚 Referências

- [gRPC Documentation](https://grpc.io/docs/languages/node/)
- [Proto Files](/proto)
- [gRPC Benchmark Results](https://grpc.io/docs/guides/benchmarking/)

---

**Próximo Passo para Completar a Comparação** | Novembro 2025
