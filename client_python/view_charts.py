"""
Visualizador de gráficos de teste de carga
Permite abrir os gráficos gerados no navegador ou visualizador de imagens
"""

import os
import sys
from pathlib import Path
import platform
import subprocess

class ChartViewer:
    """Visualizador de gráficos"""
    
    def __init__(self):
        """Inicializar visualizador"""
        self.chart_dir = Path("charts")
        self.charts = [
            ("01_tempo_medio_por_operacao.png", "Tempo Médio por Operação"),
            ("02_requisicoes_por_segundo.png", "Requisições por Segundo"),
            ("03_comparacao_tempo_geral.png", "Comparação de Tempo Geral"),
            ("04_comparacao_req_per_sec.png", "Comparação de Throughput"),
            ("05_radar_comparison.png", "Comparação Radar"),
            ("06_heatmap_tempo.png", "Heatmap de Tempo"),
            ("07_heatmap_req_sec.png", "Heatmap de Throughput"),
            ("08_ranking_geral.png", "Ranking Geral"),
        ]
    
    def check_charts_exist(self) -> bool:
        """Verificar se os gráficos existem"""
        if not self.chart_dir.exists():
            print(f"\n❌ Diretório de gráficos não encontrado: {self.chart_dir}")
            print("   Execute: python load_test.py")
            return False
        
        missing = []
        for chart, _ in self.charts:
            chart_path = self.chart_dir / chart
            if not chart_path.exists():
                missing.append(chart)
        
        if missing:
            print(f"\n⚠️  Alguns gráficos estão faltando:")
            for chart in missing:
                print(f"   - {chart}")
            return False
        
        return True
    
    def open_chart(self, chart_file: str):
        """Abrir um gráfico específico"""
        chart_path = self.chart_dir / chart_file
        
        if not chart_path.exists():
            print(f"\n❌ Gráfico não encontrado: {chart_path}")
            return False
        
        try:
            if platform.system() == "Windows":
                os.startfile(str(chart_path))
            elif platform.system() == "Darwin":  # macOS
                subprocess.run(["open", str(chart_path)], check=True)
            else:  # Linux
                subprocess.run(["xdg-open", str(chart_path)], check=True)
            
            print(f"✅ Abrindo: {chart_file}")
            return True
        except Exception as e:
            print(f"\n❌ Erro ao abrir gráfico: {e}")
            return False
    
    def open_all_charts(self):
        """Abrir todos os gráficos"""
        print("\n" + "="*80)
        print("📊 ABRINDO TODOS OS GRÁFICOS")
        print("="*80 + "\n")
        
        for chart, _ in self.charts:
            self.open_chart(chart)
        
        print("\n✅ Todos os gráficos foram abertos!")
    
    def list_charts(self):
        """Listar todos os gráficos disponíveis"""
        print("\n" + "="*80)
        print("📊 GRÁFICOS DISPONÍVEIS")
        print("="*80 + "\n")
        
        for i, (chart, description) in enumerate(self.charts, 1):
            chart_path = self.chart_dir / chart
            exists = "✅" if chart_path.exists() else "❌"
            print(f"{i}. {exists} {description}")
            print(f"   Arquivo: {chart}\n")
    
    def show_menu(self):
        """Mostrar menu interativo"""
        while True:
            print("\n" + "="*80)
            print("📊 VISUALIZADOR DE GRÁFICOS DE TESTE DE CARGA")
            print("="*80 + "\n")
            
            print("1. Ver todos os gráficos")
            print("2. Abrir gráfico específico")
            print("3. Abrir pasta de gráficos")
            print("4. Sair")
            print()
            
            choice = input("👉 Escolha uma opção [1-4]: ").strip()
            
            if choice == "1":
                self.open_all_charts()
            elif choice == "2":
                self.list_charts()
                try:
                    chart_num = int(input("\n👉 Escolha o número do gráfico [1-8]: "))
                    if 1 <= chart_num <= len(self.charts):
                        chart_file, _ = self.charts[chart_num - 1]
                        self.open_chart(chart_file)
                    else:
                        print("❌ Número inválido!")
                except ValueError:
                    print("❌ Entrada inválida!")
            elif choice == "3":
                chart_abs_path = os.path.abspath(self.chart_dir)
                try:
                    if platform.system() == "Windows":
                        os.startfile(chart_abs_path)
                    elif platform.system() == "Darwin":
                        subprocess.run(["open", chart_abs_path], check=True)
                    else:
                        subprocess.run(["xdg-open", chart_abs_path], check=True)
                    print(f"\n✅ Abrindo pasta: {chart_abs_path}")
                except Exception as e:
                    print(f"\n❌ Erro ao abrir pasta: {e}")
            elif choice == "4":
                print("\n👋 Até logo!")
                break
            else:
                print("\n❌ Opção inválida!")
            
            input("\nPressione ENTER para continuar...")


def main():
    """Função principal"""
    viewer = ChartViewer()
    
    # Verificar se gráficos existem
    if not viewer.check_charts_exist():
        print("\n💡 Para gerar os gráficos, execute:")
        print("   python load_test.py")
        return
    
    # Se argumentos, abrir diretamente
    if len(sys.argv) > 1:
        if sys.argv[1] == "all":
            viewer.open_all_charts()
        elif sys.argv[1] == "list":
            viewer.list_charts()
        else:
            # Tentar abrir gráfico específico por nome
            viewer.open_chart(sys.argv[1])
    else:
        # Menu interativo
        viewer.show_menu()


if __name__ == "__main__":
    main()
