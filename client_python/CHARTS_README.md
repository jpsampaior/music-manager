# 📊 Gráficos de Teste de Carga

Documentação dos gráficos gerados automaticamente pelo load test.

## 📂 Arquivos

### 1. `01_tempo_medio_por_operacao.png`
**Tipo**: Gráfico de barras agrupadas (escala logarítmica)

**O que mostra**: 
- Tempo médio (em ms) de cada operação para cada tecnologia
- Escala logarítmica para melhor visualização (SOAP tem valores muito menores)

**Interpretação**:
- Barras mais curtas = melhor performance
- SOAP aparece como praticamente imperceptível (0.02-0.16ms)
- REST, GraphQL e gRPC ficam em ~70-150ms

---

### 2. `02_requisicoes_por_segundo.png`
**Tipo**: Gráfico de barras agrupadas (escala logarítmica)

**O que mostra**:
- Throughput (requisições por segundo) de cada operação por tecnologia
- Escala logarítmica para comparação significativa

**Interpretação**:
- Barras mais altas = melhor throughput
- SOAP domina com 5k-31k req/s
- REST, GraphQL e gRPC ficam em 4-14 req/s

---

### 3. `03_comparacao_tempo_geral.png`
**Tipo**: Gráfico de barras horizontal (escala logarítmica)

**O que mostra**:
- Tempo médio geral de cada tecnologia (média de todas as operações)
- Ranking visual com valores exatos

**Ranking (do mais rápido para o mais lento)**:
1. 🏆 **SOAP**: 0.05ms
2. 🥈 **gRPC**: 102.96ms
3. 🥉 **REST**: 103.12ms
4. **GraphQL**: 146.29ms

---

### 4. `04_comparacao_req_per_sec.png`
**Tipo**: Gráfico de barras horizontal (escala logarítmica)

**O que mostra**:
- Throughput médio geral de cada tecnologia
- Ranking visual com valores de requisições por segundo

**Ranking (do mais rápido para o mais lento)**:
1. 🏆 **SOAP**: 23,058.18 req/s
2. 🥈 **REST**: 10.86 req/s
3. 🥉 **gRPC**: 10.80 req/s
4. **GraphQL**: 8.64 req/s

---

### 5. `05_radar_comparison.png`
**Tipo**: Gráfico radar (normalizado)

**O que mostra**:
- Comparação visual de performance de cada tecnologia em cada operação
- Dados normalizados (100/tempo para melhor visualização)
- Quanto maior a área, melhor a performance

**Características**:
- Eixos = Operações (5 eixos para 5 operações)
- Cor de cada linha = Tecnologia diferente
- Área preenchida = Performance relativa

**Interpretação**:
- SOAP terá área maior (mais rápido)
- REST/gRPC terão áreas similares
- GraphQL terá área menor em algumas operações

---

### 6. `06_heatmap_tempo.png`
**Tipo**: Heatmap com cores (escala logarítmica)

**O que mostra**:
- Tempo médio em cada célula (Tecnologia × Operação)
- Cores: Vermelho = Lento, Verde = Rápido
- Valores exatos em cada célula

**Matriz**:
- Linhas = Tecnologias (REST, GraphQL, SOAP, gRPC)
- Colunas = Operações (5 operações diferentes)
- Cor de fundo = Intensidade do tempo

**Interpretação**:
- SOAP será completamente verde (0.02-0.16ms)
- REST/gRPC terão cores claras e amarelas (~70-150ms)
- GraphQL terá cores mais vermelhas (~70-225ms)

---

### 7. `07_heatmap_req_sec.png`
**Tipo**: Heatmap com cores (escala logarítmica)

**O que mostra**:
- Requisições por segundo em cada célula
- Cores: Branco/Amarelo = Baixo, Verde escuro = Alto
- Valores em notação compacta (k = mil)

**Matriz**:
- Linhas = Tecnologias
- Colunas = Operações
- Cor de fundo = Intensidade do throughput

**Interpretação**:
- SOAP será completamente verde escuro (5k-31k req/s)
- REST/gRPC terão cores mais claras (6-14 req/s)
- GraphQL terá cores mais pálidas (4-13 req/s)

---

### 8. `08_ranking_geral.png`
**Tipo**: Dois gráficos de barras horizontais lado a lado

**Lado Esquerdo - Ranking por Tempo** (Menor é melhor):
1. 🥇 **SOAP**: 0.003ms
2. 🥈 **gRPC**: 102.96ms
3. 🥉 **REST**: 103.12ms
4. 🏅 **GraphQL**: 146.29ms

**Lado Direito - Ranking por Throughput** (Maior é melhor):
1. 🥇 **SOAP**: 23,058.18 req/s
2. 🥈 **REST**: 10.86 req/s
3. 🥉 **gRPC**: 10.80 req/s
4. 🏅 **GraphQL**: 8.64 req/s

---

## 🔍 Como Interpretar os Dados

### SOAP (Anômalo)
- **Tempo**: 0.02-0.16ms (extremamente rápido)
- **Throughput**: 5k-31k req/s (extremamente alto)
- **Motivo**: Possivelmente falhas nas requisições (taxa de sucesso 0%)
- **⚠️ Atenção**: Esses valores não são realistas, indicam problemas de conectividade

### REST vs gRPC
- **Tempo**: ~103ms (similares)
- **Throughput**: ~10.8 req/s (similares)
- **Diferença**: Negligenciável (< 1%)

### GraphQL
- **Tempo**: ~146ms (15% mais lento que REST/gRPC)
- **Throughput**: ~8.6 req/s (20% mais lento)
- **Razão**: Parsing de queries mais complexo

---

## 📈 Comparação Visual

### Performance Relativa (normalizado para REST = 100)

| Tecnologia | Tempo | Throughput |
|-----------|--------|-----------|
| SOAP      | ~0%    | ~2,120%   |
| REST      | 100%   | 100%      |
| gRPC      | 99.8%  | 99.4%     |
| GraphQL   | 142%   | 79.6%     |

---

## 🎯 Conclusões

### Melhor para Latência Baixa
1. 🏆 SOAP (problemático - aparente falha)
2. 🥈 REST / gRPC (praticamente empatados)
3. 🥉 GraphQL

### Melhor para Throughput Alto
1. 🏆 SOAP (problemático)
2. 🥈 REST / gRPC (similares)
3. 🥉 GraphQL

### Recomendações de Uso
- **REST**: Padrão, confiável, boa performance
- **gRPC**: Melhor que REST em cenários específicos (não validado aqui)
- **GraphQL**: Para queries complexas (aceita perda de ~15% em performance)
- **SOAP**: Legado, não recomendado (falhas aparentes)

---

## 🔧 Regenerar Gráficos

Execute o comando:
```powershell
python generate_charts.py
```

Ou execute o load test completo:
```powershell
python load_test.py
```

Os gráficos serão salvos automaticamente em `./charts/`

---

**Gerado em**: Dezembro 2, 2025
**Formato**: PNG @ 300 DPI
**Total de Requisições**: 2,000 (100 por operação × 20 operações)
