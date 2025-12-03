# 📊 Gráficos de Teste de Carga - Instruções de Uso

Todos os gráficos foram gerados com sucesso! Aqui está como usar:

## 🎯 Arquivos Principais

### Geração
- **`generate_charts.py`** - Script que gera os 8 gráficos

### Visualização
- **`view_charts.py`** - Visualizador interativo de gráficos

### Integração
- **`load_test.py`** (atualizado) - Agora gera gráficos automaticamente após testes

### Documentação
- **`CHARTS_README.md`** - Explicação detalhada de cada gráfico

## 🚀 Como Usar

### Opção 1: Regenerar Gráficos Sozinhos
```powershell
python generate_charts.py
```

### Opção 2: Rodar Teste Completo (com gráficos)
```powershell
python load_test.py
```
Isso vai:
1. Executar 100 requisições por operação
2. Mostrar o relatório
3. Gerar os 8 gráficos automaticamente
4. Salvar em `./charts/`

### Opção 3: Visualizar Gráficos
```powershell
python view_charts.py
```
Menu interativo para:
- Ver todos os gráficos
- Abrir gráficos específicos
- Abrir pasta de gráficos

---

## 📊 Gráficos Gerados

### 1. Comparação por Operação
- **`01_tempo_medio_por_operacao.png`** - Tempo (ms) por operação
- **`02_requisicoes_por_segundo.png`** - Throughput por operação

### 2. Comparação Geral
- **`03_comparacao_tempo_geral.png`** - Ranking de tempo
- **`04_comparacao_req_per_sec.png`** - Ranking de throughput

### 3. Análise Avançada
- **`05_radar_comparison.png`** - Comparação radar normalizada
- **`06_heatmap_tempo.png`** - Mapa de calor (tempo)
- **`07_heatmap_req_sec.png`** - Mapa de calor (throughput)
- **`08_ranking_geral.png`** - Rankings finais (2 em 1)

---

## 🎨 Recursos dos Gráficos

### Escala Logarítmica
- Usado para dados com grande variação (SOAP vs REST/gRPC)
- Permite visualizar dados de 0.05ms a 225ms na mesma escala

### Cores Padrão
- 🔵 **REST** - Azul
- 🟣 **GraphQL** - Roxo
- 🔴 **SOAP** - Vermelho
- 🟢 **gRPC** - Verde

### Formato
- **Resolução**: 300 DPI (Alta qualidade)
- **Tipo**: PNG (compatível com tudo)
- **Diretório**: `./charts/`

---

## 📈 Interpretação Rápida

### Tempo Médio Geral
| Posição | Tecnologia | Tempo   |
|---------|-----------|---------|
| 1º 🥇   | SOAP      | 0.05ms  |
| 2º 🥈   | gRPC      | 102.96ms|
| 3º 🥉   | REST      | 103.12ms|
| 4º 🏅   | GraphQL   | 146.29ms|

### Throughput Médio
| Posição | Tecnologia | Req/s      |
|---------|-----------|-----------|
| 1º 🥇   | SOAP      | 23,058.18 |
| 2º 🥈   | REST      | 10.86     |
| 3º 🥉   | gRPC      | 10.80     |
| 4º 🏅   | GraphQL   | 8.64      |

---

## 💡 Casos de Uso

### Para Apresentações
```powershell
python view_charts.py
# Escolha opção 1 para abrir todos
```

### Para Análise Detalhada
Abra `CHARTS_README.md` para explicação de cada gráfico

### Para Relatório
Copie os PNGs de `./charts/` para seu documento

### Para Publicação
- PNGs @ 300 DPI prontos para impressão
- Tamanho adequado para incluir em slides/papers

---

## 🔧 Troubleshooting

### Erro: "Folder not found"
Execute o load test primeiro:
```powershell
python load_test.py
```

### Erro: "matplotlib not found"
Instale dependências:
```powershell
pip install -r requirements.txt
```

### Gráficos não abrem
Abra manualmente a pasta:
```powershell
# Windows
start ./charts

# macOS
open ./charts

# Linux
xdg-open ./charts
```

---

## 📝 Notas Importantes

### Sobre SOAP
⚠️ Os resultados de SOAP (0.05ms, 23k req/s) podem indicar **falhas nas requisições**
- Taxa de sucesso: 0%
- Valores aparentemente anormais
- Verificar conectividade SOAP

### REST vs gRPC
- Praticamente idênticos (~103ms)
- Diferença < 1%
- Ambos são viáveis

### GraphQL
- ~15% mais lento que REST/gRPC
- Aceitável para muitos cenários
- Flexibility vale o tradeoff

---

## 📚 Documentação Relacionada

- **README.md** - Guia geral do cliente Python
- **CHARTS_README.md** - Análise detalhada de cada gráfico
- **load_test.py** - Código do teste de carga
- **generate_charts.py** - Código de geração de gráficos

---

## 🎊 Próximas Etapas

### Imediatamente
1. Ver gráficos: `python view_charts.py`
2. Estudar análise: Abrir `CHARTS_README.md`

### Em Seguida
1. Validar resultados SOAP
2. Otimizar com base nos dados
3. Incluir em documentação

### Opcional
1. Customizar cores dos gráficos
2. Adicionar mais métricas
3. Integrar com sistema de métricas

---

**Status**: ✅ Gráficos gerados com sucesso
**Total de Gráficos**: 8 (PNG @ 300 DPI)
**Data**: Dezembro 2, 2025
**Tamanho Total**: ~500 KB
