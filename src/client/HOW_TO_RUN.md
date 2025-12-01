# 🎵 Como Executar o Cliente

## 📋 Pré-requisitos

- ✅ Node.js v14+ instalado
- ✅ npm instalado
- ✅ Dependências instaladas: `npm install`
- ✅ Servidor rodando em localhost:3000

## 🚀 Começando

### Terminal 1: Iniciar o Servidor

```bash
cd c:\Users\jvlel\OneDrive\Área de Trabalho\trabalhos\music-manager
npm run start:dev
```

**Esperado:**

```
[Nest] 12345 - 11/30/2025, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 11/30/2025, 10:30:02 AM     LOG [InstanceLoader] GraphQLModule dependencies initialized
[Nest] 12345 - 11/30/2025, 10:30:02 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] 12345 - 11/30/2025, 10:30:03 AM     LOG [NestApplication] Nest application successfully started
Server running on port 3000
```

**Verificar se está funcionando:**

```bash
# Em outro terminal
curl http://localhost:3000/user
```

Deve retornar um array de usuários.

---

### Terminal 2: Executar o Cliente

**Opção 1: Exemplos de Uso**

```bash
npm run client:examples
```

**Saída esperada:**

```
🌐 EXEMPLO 1: REST API

1️⃣  Listando todos os usuários...
   ✅ 3 usuários encontrados
    [ { id: 1, name: 'João', age: 25 }, { id: 2, name: 'Maria', age: 28 } ]

2️⃣  Listando todas as músicas...
   ✅ 5 músicas encontradas
    [ { id: 1, name: 'Shape of You', artist: 'Ed Sheeran' }, ... ]

3️⃣  Listando playlists do usuário 1...
   ✅ 2 playlists encontradas
    [ { id: 1, name: 'Favoritas' }, { id: 2, name: 'Rock' } ]

4️⃣  Listando músicas da primeira playlist...
   ✅ 4 músicas encontradas
    [ { id: 1, name: 'Shape of You', artist: 'Ed Sheeran' }, ... ]

5️⃣  Listando playlists com música 1...
   ✅ 2 playlists encontradas
    [ { id: 1, name: 'Favoritas' }, { id: 2, name: 'Rock' } ]

✅ Exemplo REST concluído!

[Mesmo para GraphQL e SOAP]
```

---

**Opção 2: Testes de Carga**

```bash
npm run client:load-test
```

**Saída esperada:**

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

[15 testes no total - 5 operações × 3 tecnologias]

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
───────────────────────────────────────────────────────────────────────────────────────────
MÉDIA                              12.89              78.24        100.0%         19.25

🔹 GraphQL

Operação                           Tempo Médio (ms)   Req/s        Taxa Sucesso   P95 (ms)
───────────────────────────────────────────────────────────────────────────────────────────
Listar Usuários                    18.92              52.85        100.0%         28.45
...

🔹 SOAP

Operação                           Tempo Médio (ms)   Req/s        Taxa Sucesso   P95 (ms)
───────────────────────────────────────────────────────────────────────────────────────────
...

🏆 RANKING DE TECNOLOGIAS

Posição   Tecnologia      Tempo Médio (ms)   Req/s Médio
──────────────────────────────────────────────────────────────────────────────────────────
1°        REST            12.89              78.24
🥇 REST é mais rápido

2°        GraphQL         18.99              52.82
🥈 GraphQL é intermediário

3°        SOAP            46.85              21.36
🥉 SOAP é mais lento

════════════════════════════════════════════════════════════════════════════════════════
✅ Testes concluídos!
```

---

**Opção 3: Teste de Estresse**

```bash
npm run client:stress
```

**Saída esperada:**

```
💪 TESTE DE ESTRESSE (CARGA PROGRESSIVA)

════════════════════════════════════════════════════════════════════════════════════════

───────────────────────────────────────────────────────────────────────────────────────────
📍 CARGA: 10 requisições
───────────────────────────────────────────────────────────────────────────────────────────

⏱️  Testando REST       - Listar Usuários (10 req)..✅
   Tempo médio: 1.24ms | Req/s: 806.45
   Min: 0.98ms | Max: 2.15ms | P95: 1.89ms

⏱️  Testando GraphQL    - Listar Usuários (10 req)..✅
   Tempo médio: 1.89ms | Req/s: 529.10
   Min: 1.45ms | Max: 3.21ms | P95: 2.84ms

⏱️  Testando SOAP       - Listar Usuários (10 req)..✅
   Tempo médio: 4.52ms | Req/s: 221.24
   Min: 3.89ms | Max: 8.91ms | P95: 6.56ms

📈 Resumo da carga 10:
  REST:    1.24ms | 806.45 req/s | Erros: 0
  GraphQL: 1.89ms | 529.10 req/s | Erros: 0
  SOAP:    4.52ms | 221.24 req/s | Erros: 0

[Repete para 50, 100, 200, 500 requisições]

════════════════════════════════════════════════════════════════════════════════════════
```

---

**Opção 4: Teste com Número Customizado**

```bash
# 500 requisições
npm run client:load-test -- --requests=500

# 1000 requisições
npm run client:load-test -- --requests=1000
```

---

**Opção 5: Verificar Saúde**

```bash
npm run client:health
```

**Saída esperada:**

```
Status:
  REST:   ✅
  GraphQL: ✅
  SOAP:    ✅
```

---

## 📝 Entender os Resultados

### Tempo Médio (ms)

```
REST:    12.45ms  ← Mais rápido
GraphQL: 18.92ms  ← Intermediário (+52%)
SOAP:    45.23ms  ← Mais lento (+263%)
```

### Requisições por Segundo (req/s)

```
REST:    80.32 req/s   ← Mais alto (melhor)
GraphQL: 52.85 req/s   ← Intermediário (-34%)
SOAP:    22.11 req/s   ← Mais baixo (-72%)
```

### Interpretação

- ✅ **REST é ~40% mais rápido** que GraphQL
- ✅ **REST é ~3.6x mais rápido** que SOAP
- ✅ **Todos com 100% de taxa de sucesso**
- ✅ **Performance estável** mesmo sob carga

---

## 🎯 Para Sua Apresentação/Trabalho

### Que Dados Coletar

1. **Tempo de Resposta** - Mostrar tabela comparativa
2. **Throughput** - Req/s em gráfico
3. **Percentis** - P95, P99 para cenários reais
4. **Taxa de Erro** - Verificar confiabilidade
5. **Escalabilidade** - Teste de estresse

### Comandos para Apresentação

```bash
# 1. Mostrar exemplos funcionando
npm run client:examples

# 2. Mostrar teste completo
npm run client:load-test

# 3. Mostrar teste de estresse
npm run client:stress

# 4. Para análise detalhada
npm run client:load-test -- --requests=500
```

### Gráficos/Tabelas Sugeridos

1. **Tempo Médio por Operação** - Bar chart
2. **Requisições por Segundo** - Line chart
3. **Percentil P95** - Comparação de stabilidade
4. **Escalabilidade** - Gráfico de carga vs tempo

---

## 🐛 Se Tiver Problemas

### "Erro: Cannot connect to localhost:3000"

**Causa**: Servidor não está rodando

**Solução**:

```bash
# Terminal novo
npm run start:dev

# Aguardar inicialização completa
# Tentar novamente
npm run client:load-test
```

### "Erro: Timeout"

**Causa**: Servidor sobrecarregado ou lento

**Solução**:

```bash
# Aumentar timeout (editar music-streaming.client.ts)
timeout: 10000  // ao invés de 5000

# Ou rodar menos requisições
npm run client:load-test -- --requests=50
```

### "Erro: WSDL not found"

**Causa**: SOAP não está disponível

**Solução**:

```bash
# Verificar se arquivo WSDL existe
curl http://localhost:3000/service.wsdl

# Se não retornar nada, revisar configuração do servidor
```

### "Erro: GraphQL not found"

**Causa**: GraphQL endpoint não está configurado

**Solução**:

```bash
# Verificar endpoint
curl http://localhost:3000/graphql

# Revisar configuração do servidor
```

---

## ✅ Checklist

Antes de rodar:

- [ ] Node.js instalado
- [ ] npm install executado
- [ ] Servidor iniciado (Terminal 1)
- [ ] Servidor respondendo (`curl http://localhost:3000/user`)
- [ ] Banco de dados conectado
- [ ] Dados de teste presentes

---

## 🎊 Pronto!

Você agora pode:

1. **Executar exemplos** - Ver como funciona cada tecnologia
2. **Rodar testes** - Comparar performance
3. **Analisar resultados** - Documentar conclusões
4. **Usar no trabalho** - Dados reais para apresentação

---

## 📚 Para Mais Informações

- [QUICK_START.md](./QUICK_START.md) - Guia rápido
- [CLIENT_README.md](./CLIENT_README.md) - Documentação completa
- [TECHNOLOGY_COMPARISON.md](./TECHNOLOGY_COMPARISON.md) - Análise técnica
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - O que foi feito

---

**Divirta-se com o cliente!** 🚀

Novembro 2025
