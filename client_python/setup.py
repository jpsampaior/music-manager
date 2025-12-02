#!/usr/bin/env python3
"""
Script de setup para cliente Python de música streaming
Instala dependências e compila proto files
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, description):
    """Executar comando e mostrar resultado"""
    print(f"\n{'='*80}")
    print(f"▶️  {description}")
    print(f"{'='*80}")
    print(f"Comando: {cmd}\n")
    
    result = subprocess.run(cmd, shell=True)
    
    if result.returncode == 0:
        print(f"\n✅ {description} - OK")
        return True
    else:
        print(f"\n❌ {description} - FALHOU")
        return False

def main():
    """Executar setup completo"""
    print("\n" + "="*80)
    print("🎵 SETUP - CLIENTE PYTHON DE MÚSICA STREAMING")
    print("="*80)
    
    # Verificar Python
    print(f"\n✓ Python: {sys.version}")
    
    # Instalar dependências
    success = True
    
    success = run_command(
        f"{sys.executable} -m pip install -r requirements.txt",
        "Instalando dependências (pip install -r requirements.txt)"
    ) and success
    
    if not success:
        print("\n❌ Falha ao instalar dependências")
        return False
    
    # Compilar proto files
    proto_dir = Path("../../proto")
    if not proto_dir.exists():
        print(f"\n⚠️  Diretório proto não encontrado: {proto_dir}")
    else:
        success = run_command(
            f"{sys.executable} -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto",
            "Compilando proto files (grpc_tools.protoc)"
        ) and success
    
    # Resumo final
    print("\n" + "="*80)
    print("📋 RESUMO DO SETUP")
    print("="*80)
    
    if success:
        print("\n✅ Setup completado com sucesso!\n")
        print("Próximos passos:\n")
        print("1️⃣  Executar exemplos:")
        print("   python examples.py\n")
        print("2️⃣  Executar testes de carga:")
        print("   python load_test.py\n")
        print("3️⃣  Usar interface interativa:")
        print("   python cli.py\n")
        print("4️⃣  Usar cliente programaticamente:")
        print("   from music_streaming_client import MusicStreamingClient")
    else:
        print("\n⚠️  Setup completado com avisos. Verifique os erros acima.")
        print("\nTente executar os comandos manualmente:")
        print(f"   {sys.executable} -m pip install -r requirements.txt")
        print(f"   {sys.executable} -m grpc_tools.protoc ...")
    
    print("\n" + "="*80)

if __name__ == "__main__":
    main()
