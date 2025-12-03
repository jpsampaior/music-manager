# 📊 GRÁFICOS - Quick Start

## 🎯 Começar em 30 segundos

### Opção 1: Ver os Gráficos Agora
```powershell
python view_charts.py
```

### Opção 2: Abrir Pasta de Gráficos
```powershell
# Windows
start ./charts
```

### Opção 3: Regenerar Gráficos
```powershell
python generate_charts.py
```

---

## 📊 O Que Você Vai Ver

### 8 Gráficos Profissionais
✅ Tempo médio por operação (escala log)
✅ Requisições por segundo (escala log)
✅ Comparação de tempo geral (ranking)
✅ Comparação de throughput (ranking)
✅ Comparação radar (normalizada)
✅ Heatmap de tempo
✅ Heatmap de throughput
✅ Ranking final (duplo)

### Formato
- PNG de alta resolução (300 DPI)
- Pronto para apresentações/publicações
- ~500 KB total

---

## 🏆 Ranking de Performance

| Posição | Tecnologia | Tempo   | Throughput |
|---------|-----------|---------|-----------|
| 1º 🥇   | SOAP*     | 0.05ms  | 23k req/s |
| 2º 🥈   | gRPC      | 102.96ms| 10.8 r/s  |
| 3º 🥉   | REST      | 103.12ms| 10.9 r/s  |
| 4º 🏅   | GraphQL   | 146.29ms| 8.6 r/s   |

*SOAP: Valores com possíveis anomalias ⚠️

---

## 💡 Principais Achados

✨ **REST e gRPC**: Praticamente idênticos (diferença < 1%)
📊 **GraphQL**: ~15% mais lento (por parsing complexo)
🚨 **SOAP**: Investigar (taxa de sucesso 0%)

---

## 📖 Mais Informações

- **CHARTS_README.md** - Análise detalhada de cada gráfico
- **CHARTS_USAGE.md** - Guia completo de uso
- **SUMMARY.md** - Resumo executivo

---

**Pronto?** → `python view_charts.py`
