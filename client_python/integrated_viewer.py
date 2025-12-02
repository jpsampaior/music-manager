"""
Visualizador Integrado: Dados em Texto + Gráficos PNG
Permite navegar entre visualizações em texto e abrir gráficos PNG
"""

import os
import subprocess
import platform
from pathlib import Path
from datetime import datetime

class IntegratedViewer:
    """Visualizador integrado de dados em texto e gráficos"""
    
    def __init__(self):
        """Inicializar visualizador"""
        self.charts_dir = Path("./charts")
        self.charts = [
            ("01_tempo_medio_por_operacao.png", "Tempo Médio por Operação (Log Scale)"),
            ("02_requisicoes_por_segundo.png", "Requisições por Segundo (Log Scale)"),
            ("03_comparacao_tempo_geral.png", "Comparação Geral - Tempo"),
            ("04_comparacao_req_per_sec.png", "Comparação Geral - Throughput"),
            ("05_radar_comparison.png", "Radar Chart - Performance Normalizada"),
            ("06_heatmap_tempo.png", "Heatmap - Tempo por Tech x Op"),
            ("07_heatmap_req_sec.png", "Heatmap - Throughput por Tech x Op"),
            ("08_ranking_geral.png", "Ranking Geral (Duplo)"),
        ]
        
        self.technologies = ["REST", "GraphQL", "SOAP", "gRPC"]
        self.operations = [
            "Listar Usuarios",
            "Listar Musicas",
            "Playlists do Usuario",
            "Musicas da Playlist",
            "Playlists com Musica"
        ]
        
        # Dados de teste
        self.avg_times = {
            "REST": [77.64, 71.30, 72.47, 151.29, 142.90],
            "GraphQL": [75.07, 71.97, 145.39, 225.66, 213.39],
            "SOAP": [0.16, 0.02, 0.03, 0.03, 0.03],
            "gRPC": [75.44, 75.09, 72.97, 148.00, 143.31]
        }
        
        self.req_per_sec = {
            "REST": [12.88, 14.02, 13.79, 6.61, 7.00],
            "GraphQL": [13.32, 13.89, 6.88, 4.43, 4.69],
            "SOAP": [5885.85, 31947.86, 24383.70, 27873.79, 25199.71],
            "gRPC": [13.25, 13.31, 13.70, 6.76, 6.98]
        }
    
    def open_file(self, filepath):
        """Abrir arquivo com aplicativo padrão (cross-platform)"""
        try:
            if platform.system() == "Windows":
                os.startfile(filepath)
            elif platform.system() == "Darwin":  # macOS
                subprocess.Popen(["open", filepath])
            else:  # Linux
                subprocess.Popen(["xdg-open", filepath])
            return True
        except Exception as e:
            print(f"❌ Erro ao abrir arquivo: {e}")
            return False
    
    def print_header(self, title):
        """Imprimir cabeçalho"""
        print("\n" + "=" * 80)
        print(f"  {title}")
        print("=" * 80)
    
    def show_text_summary(self):
        """Mostrar resumo em texto"""
        self.print_header("RESUMO DOS DADOS (TEXTO)")
        
        print("\n📊 TEMPO MÉDIO POR OPERAÇÃO (ms)\n")
        print(f"{'Operação':<30} {'REST':>12} {'GraphQL':>12} {'SOAP':>12} {'gRPC':>12}")
        print("-" * 80)
        
        for i, op in enumerate(self.operations):
            row = f"{op:<30}"
            for tech in self.technologies:
                value = self.avg_times[tech][i]
                row += f" {value:>11.2f}"
            print(row)
        
        print("-" * 80)
        row = f"{'MÉDIA':<30}"
        for tech in self.technologies:
            avg = sum(self.avg_times[tech]) / len(self.avg_times[tech])
            row += f" {avg:>11.2f}"
        print(row)
        
        # Throughput
        print("\n\n📊 REQUISIÇÕES POR SEGUNDO (req/s)\n")
        print(f"{'Operação':<30} {'REST':>14} {'GraphQL':>14} {'SOAP':>14} {'gRPC':>14}")
        print("-" * 90)
        
        for i, op in enumerate(self.operations):
            row = f"{op:<30}"
            for tech in self.technologies:
                value = self.req_per_sec[tech][i]
                row += f" {value:>13.2f}"
            print(row)
        
        print("-" * 90)
        row = f"{'MÉDIA':<30}"
        for tech in self.technologies:
            avg = sum(self.req_per_sec[tech]) / len(self.req_per_sec[tech])
            row += f" {avg:>13.2f}"
        print(row)
        
        # Ranking geral
        print("\n\n🏆 RANKING GERAL\n")
        
        avg_general = {
            "REST": sum(self.avg_times["REST"]) / len(self.avg_times["REST"]),
            "GraphQL": sum(self.avg_times["GraphQL"]) / len(self.avg_times["GraphQL"]),
            "SOAP": sum(self.avg_times["SOAP"]) / len(self.avg_times["SOAP"]),
            "gRPC": sum(self.avg_times["gRPC"]) / len(self.avg_times["gRPC"])
        }
        
        req_general = {
            "REST": sum(self.req_per_sec["REST"]) / len(self.req_per_sec["REST"]),
            "GraphQL": sum(self.req_per_sec["GraphQL"]) / len(self.req_per_sec["GraphQL"]),
            "SOAP": sum(self.req_per_sec["SOAP"]) / len(self.req_per_sec["SOAP"]),
            "gRPC": sum(self.req_per_sec["gRPC"]) / len(self.req_per_sec["gRPC"])
        }
        
        sorted_time = sorted(avg_general.items(), key=lambda x: x[1])
        sorted_req = sorted(req_general.items(), key=lambda x: x[1], reverse=True)
        
        medals = ["🥇", "🥈", "🥉", "🏅"]
        
        print(f"{'Posição':<10} {'Tempo (ms)':<30} {'Throughput (req/s)':<30}")
        print("-" * 70)
        
        for i in range(len(medals)):
            tech_time = sorted_time[i][0]
            val_time = sorted_time[i][1]
            
            tech_req = sorted_req[i][0]
            val_req = sorted_req[i][1]
            
            time_str = f"{medals[i]} {i+1}º {tech_time}: {val_time:.2f}ms"
            req_str = f"{medals[i]} {i+1}º {tech_req}: {val_req:.2f} r/s"
            
            print(f"{time_str:<40} {req_str:<40}")
    
    def show_charts_menu(self):
        """Menu para visualizar gráficos"""
        while True:
            self.print_header("VISUALIZADOR DE GRÁFICOS (PNG)")
            
            print("\n📈 GRÁFICOS DISPONÍVEIS:\n")
            
            for i, (filename, description) in enumerate(self.charts, 1):
                filepath = self.charts_dir / filename
                status = "✅" if filepath.exists() else "❌"
                print(f"{i}. {status} {description}")
                print(f"   ({filename})")
            
            print(f"\n{len(self.charts) + 1}. Abrir pasta de gráficos")
            print(f"{len(self.charts) + 2}. Voltar ao menu anterior")
            print(f"{len(self.charts) + 3}. Sair")
            print("-" * 80)
            
            choice = input("\n👉 Escolha uma opção: ").strip()
            
            if choice.isdigit():
                choice = int(choice)
                
                if 1 <= choice <= len(self.charts):
                    filename, description = self.charts[choice - 1]
                    filepath = self.charts_dir / filename
                    
                    if filepath.exists():
                        print(f"\n📂 Abrindo: {description}...")
                        if self.open_file(str(filepath.absolute())):
                            print("✅ Gráfico aberto!")
                        else:
                            print("❌ Não foi possível abrir o gráfico")
                    else:
                        print(f"❌ Arquivo não encontrado: {filepath}")
                    
                    input("\nPressione ENTER para continuar...")
                
                elif choice == len(self.charts) + 1:
                    print(f"\n📂 Abrindo pasta: {self.charts_dir.absolute()}")
                    try:
                        if platform.system() == "Windows":
                            os.startfile(str(self.charts_dir.absolute()))
                        elif platform.system() == "Darwin":
                            subprocess.Popen(["open", str(self.charts_dir.absolute())])
                        else:
                            subprocess.Popen(["xdg-open", str(self.charts_dir.absolute())])
                        print("✅ Pasta aberta!")
                    except Exception as e:
                        print(f"❌ Erro ao abrir pasta: {e}")
                    input("\nPressione ENTER para continuar...")
                
                elif choice == len(self.charts) + 2:
                    break
                
                elif choice == len(self.charts) + 3:
                    print("\n👋 Até logo!")
                    return False
            else:
                print("\n❌ Opção inválida!")
                input("\nPressione ENTER para continuar...")
        
        return True
    
    def show_main_menu(self):
        """Menu principal integrado"""
        while True:
            self.print_header("📊 VISUALIZADOR INTEGRADO - TEXTO & GRÁFICOS")
            
            print("\n1. Ver Dados em Formato Texto (Tabelas + Resumo)")
            print("2. Visualizar Gráficos PNG")
            print("3. Abrir Gerador de Gráficos (view_charts.py)")
            print("4. Exportar Relatório Completo")
            print("5. Abrir Visualizador de Dados (view_data.py)")
            print("0. Sair")
            print("-" * 80)
            
            choice = input("\n👉 Escolha uma opção [0-5]: ").strip()
            
            if choice == "1":
                self.show_text_summary()
                input("\nPressione ENTER para continuar...")
            
            elif choice == "2":
                if not self.show_charts_menu():
                    break
            
            elif choice == "3":
                print("\n📂 Abrindo gerador de gráficos...")
                try:
                    # Tentar abrir view_charts.py em novo terminal/aplicação
                    if platform.system() == "Windows":
                        subprocess.Popen(["python", "view_charts.py"])
                    else:
                        subprocess.Popen(["python3", "view_charts.py"])
                    print("✅ Gerador de gráficos aberto!")
                except Exception as e:
                    print(f"❌ Erro ao abrir: {e}")
                input("\nPressione ENTER para continuar...")
            
            elif choice == "4":
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"relatorio_completo_{timestamp}.txt"
                
                with open(filename, "w", encoding="utf-8") as f:
                    f.write("=" * 80 + "\n")
                    f.write("RELATÓRIO COMPLETO - TESTE DE CARGA\n")
                    f.write(f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")
                    f.write("=" * 80 + "\n\n")
                    
                    # Dados em tabela
                    f.write("TEMPO MÉDIO POR OPERAÇÃO (ms)\n\n")
                    f.write(f"{'Operação':<30} {'REST':>12} {'GraphQL':>12} {'SOAP':>12} {'gRPC':>12}\n")
                    f.write("-" * 80 + "\n")
                    
                    for i, op in enumerate(self.operations):
                        row = f"{op:<30}"
                        for tech in self.technologies:
                            value = self.avg_times[tech][i]
                            row += f" {value:>11.2f}"
                        f.write(row + "\n")
                    
                    f.write("\n\nREQUISIÇÕES POR SEGUNDO (req/s)\n\n")
                    f.write(f"{'Operação':<30} {'REST':>14} {'GraphQL':>14} {'SOAP':>14} {'gRPC':>14}\n")
                    f.write("-" * 90 + "\n")
                    
                    for i, op in enumerate(self.operations):
                        row = f"{op:<30}"
                        for tech in self.technologies:
                            value = self.req_per_sec[tech][i]
                            row += f" {value:>13.2f}"
                        f.write(row + "\n")
                    
                    f.write("\n\n" + "=" * 80 + "\n")
                    f.write("Gráficos disponíveis em: ./charts/\n")
                    f.write("=" * 80 + "\n")
                
                print(f"\n✅ Relatório exportado: {filename}")
                input("\nPressione ENTER para continuar...")
            
            elif choice == "5":
                print("\n📂 Abrindo visualizador de dados...")
                try:
                    if platform.system() == "Windows":
                        subprocess.Popen(["python", "view_data.py"])
                    else:
                        subprocess.Popen(["python3", "view_data.py"])
                    print("✅ Visualizador de dados aberto!")
                except Exception as e:
                    print(f"❌ Erro ao abrir: {e}")
                input("\nPressione ENTER para continuar...")
            
            elif choice == "0":
                print("\n👋 Até logo!")
                break
            
            else:
                print("\n❌ Opção inválida!")
                input("\nPressione ENTER para continuar...")


def main():
    """Função principal"""
    viewer = IntegratedViewer()
    viewer.show_main_menu()


if __name__ == "__main__":
    main()
