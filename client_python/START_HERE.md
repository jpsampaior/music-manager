# 🚀 COMECE AQUI - Cliente Python

## 3 Passos para Começar em 5 Minutos

### 1️⃣ Instalar Dependências
```powershell
pip install -r requirements.txt
```

### 2️⃣ Executar Exemplos
```powershell
python examples.py
```

### 3️⃣ Explorar o Cliente
```powershell
python cli.py
# Ou
python load_test.py
```

---

## O Que é Este Cliente?

Cliente Python unificado para testar 4 tecnologias de API:

| Tecnologia | Velocidade | Uso |
|------------|-----------|-----|
| **gRPC** ⚡ | ~0.6ms | Máxima performance |
| **REST** 📡 | ~4.5ms | Universal |
| **SOAP** 📮 | ~4.7ms | Legado/Enterprise |
| **GraphQL** 🔷 | ~9ms | Flexible queries |

## 📚 Arquivos Principais

```
📄 music_streaming_client.py  → Cliente com 20 operações
📊 load_test.py              → Teste de carga (100 req/op)
💻 examples.py               → 6 exemplos de uso
🎮 cli.py                    → Menu interativo
📖 README.md                 → Documentação completa
🛠️  SETUP_GUIDE.md            → Guia detalhado
```

## 💡 Exemplo Rápido

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
    playlists = await client.soap_list_user_playlists(1)
    print(f"Playlists: {playlists}")
    
    # Usar gRPC (se compilado)
    try:
        users = await client.grpc_list_all_users()
        print(f"Usuários (gRPC): {users}")
    except:
        print("gRPC não compilado (execute setup)")

asyncio.run(main())
```

## 🎯 Próximos Passos

### Opção A: Executar Exemplos (Recomendado)
```powershell
python examples.py
```
Mostra cada tecnologia funcionando.

### Opção B: Teste de Carga
```powershell
# Compile proto files primeiro (opcional)
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto

# Execute teste
python load_test.py
```
Compara performance das 4 tecnologias.

### Opção C: Interface Interativa
```powershell
python cli.py
```
Menu com todas as operações disponíveis.

### Opção D: Usar em Seu Código
```python
from music_streaming_client import MusicStreamingClient
# Use em sua aplicação
```

## ❓ Perguntas Comuns

**P: Preciso compilar gRPC?**
R: Não é obrigatório. As outras 3 tecnologias funcionam sem. gRPC é opcional.

**P: Qual é a mais rápida?**
R: gRPC (~0.6ms), seguida por REST/SOAP (~4.5ms), depois GraphQL (~9ms).

**P: Posso usar em produção?**
R: Sim, mas adicione retry logic e melhor tratamento de erro.

**P: É compatível com o cliente TypeScript?**
R: 100% compatível! Mesmas 20 operações, mesma lógica.

**P: Qual versão de Python?**
R: Python 3.8+ recomendado.

## 📞 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "ModuleNotFoundError: No module named 'requests'" | `pip install -r requirements.txt` |
| "Connection refused (ECONNREFUSED)" | `npm run dev` (rodaro servidor) |
| "Proto files not found" | Compile proto files (veja acima) |
| "WSDL not found" | Verifique `curl http://localhost:3000/service.wsdl` |

## 📖 Documentação Completa

- **README.md** - Documentação detalhada
- **SETUP_GUIDE.md** - Passo-a-passo de configuração
- **INDEX.md** - Índice e referência rápida
- **MIGRATION_SUMMARY.md** - Detalhes da migração TypeScript→Python

## 🎊 Bom! Agora execute:

```powershell
python examples.py
```

Divirta-se! 🎉

---

**Próximo**: Após ver os exemplos funcionarem, tente `python load_test.py` ou `python cli.py`
