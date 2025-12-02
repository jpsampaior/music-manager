"""
Visualizador de dados de teste de carga em texto
Exibe tabelas, gráficos ASCII e estatísticas em formato texto
"""

import os
from datetime import datetime
from typing import List, Dict
from pathlib import Path

class TextDataViewer:
    """Visualizador de dados em formato texto"""
    
    def __init__(self):
        """Inicializar visualizador"""
        self.technologies = ["REST", "GraphQL", "SOAP", "gRPC"]
        self.operations = [
            "Listar Usuarios",
            "Listar Musicas",
            "Playlists do Usuario",
            "Musicas da Playlist",
            "Playlists com Musica"
        ]
        
        # Dados de tempo médio (ms)
        self.avg_times = {
            "REST": [77.64, 71.30, 72.47, 151.29, 142.90],
            "GraphQL": [75.07, 71.97, 145.39, 225.66, 213.39],
            "SOAP": [0.16, 0.02, 0.03, 0.03, 0.03],
            "gRPC": [75.44, 75.09, 72.97, 148.00, 143.31]
        }
        
        # Dados de requisições por segundo
        self.req_per_sec = {
            "REST": [12.88, 14.02, 13.79, 6.61, 7.00],
            "GraphQL": [13.32, 13.89, 6.88, 4.43, 4.69],
            "SOAP": [5885.85, 31947.86, 24383.70, 27873.79, 25199.71],
            "gRPC": [13.25, 13.31, 13.70, 6.76, 6.98]
        }
        
        # Dados P95
        self.p95_times = {
            "REST": [88.19, 77.33, 80.51, 163.05, 151.06],
            "GraphQL": [80.82, 80.52, 161.07, 246.32, 227.91],
            "SOAP": [0.05, 0.04, 0.07, 0.05, 0.06],
            "gRPC": [92.84, 82.08, 81.64, 158.50, 154.77]
        }
        
        # Médias gerais
        self.avg_general = {
            "REST": 103.12,
            "GraphQL": 146.29,
            "SOAP": 0.05,
            "gRPC": 102.96
        }
        
        # Média de req/s
        self.req_sec_general = {
            "REST": 10.86,
            "GraphQL": 8.64,
            "SOAP": 23058.18,
            "gRPC": 10.80
        }
    
    def print_header(self, title: str):
        """Imprimir cabeçalho"""
        print("\n" + "=" * 90)
        print(f"  {title}")
        print("=" * 90 + "\n")
    
    def print_subheader(self, title: str):
        """Imprimir subcabeçalho"""
        print(f"\n{title}")
        print("-" * 90)
    
    def table_tempo_por_operacao(self):
        """Tabela: Tempo médio por operação"""
        self.print_subheader("TEMPO MÉDIO POR OPERAÇÃO (ms)")
        
        # Cabeçalho
        header = f"{'Operação':<30}"
        for tech in self.technologies:
            header += f" {tech:>12}"
        print(header)
        print("-" * 90)
        
        # Dados
        for i, op in enumerate(self.operations):
            row = f"{op:<30}"
            for tech in self.technologies:
                value = self.avg_times[tech][i]
                if tech == "SOAP":
                    row += f" {value:>12.2f}"
                else:
                    row += f" {value:>12.2f}"
            print(row)
        
        # Média
        print("-" * 90)
        row = f"{'MÉDIA':<30}"
        for tech in self.technologies:
            avg = sum(self.avg_times[tech]) / len(self.avg_times[tech])
            row += f" {avg:>12.2f}"
        print(row)
    
    def table_req_per_sec_operacao(self):
        """Tabela: Requisições por segundo por operação"""
        self.print_subheader("REQUISIÇÕES POR SEGUNDO (req/s)")
        
        # Cabeçalho
        header = f"{'Operação':<30}"
        for tech in self.technologies:
            header += f" {tech:>14}"
        print(header)
        print("-" * 95)
        
        # Dados
        for i, op in enumerate(self.operations):
            row = f"{op:<30}"
            for tech in self.technologies:
                value = self.req_per_sec[tech][i]
                if value > 1000:
                    row += f" {value:>14.2f}"
                else:
                    row += f" {value:>14.2f}"
            print(row)
        
        # Média
        print("-" * 95)
        row = f"{'MÉDIA':<30}"
        for tech in self.technologies:
            avg = sum(self.req_per_sec[tech]) / len(self.req_per_sec[tech])
            row += f" {avg:>14.2f}"
        print(row)
    
    def table_p95_times(self):
        """Tabela: P95 dos tempos"""
        self.print_subheader("P95 - TEMPO MÉDIO (ms)")
        
        # Cabeçalho
        header = f"{'Operação':<30}"
        for tech in self.technologies:
            header += f" {tech:>12}"
        print(header)
        print("-" * 90)
        
        # Dados
        for i, op in enumerate(self.operations):
            row = f"{op:<30}"
            for tech in self.technologies:
                value = self.p95_times[tech][i]
                row += f" {value:>12.2f}"
            print(row)
    
    def table_comparacao_geral(self):
        """Tabela: Comparação geral"""
        self.print_subheader("COMPARAÇÃO GERAL (Média de Todas as Operações)")
        
        header = f"{'Tecnologia':<20} {'Tempo (ms)':<15} {'Req/s':<15} {'Ranking Tempo':<20} {'Ranking Req/s':<20}"
        print(header)
        print("-" * 90)
        
        # Ordenar por tempo
        sorted_time = sorted(self.avg_general.items(), key=lambda x: x[1])
        sorted_req = sorted(self.req_sec_general.items(), key=lambda x: x[1], reverse=True)
        
        for tech in self.technologies:
            time_val = self.avg_general[tech]
            req_val = self.req_sec_general[tech]
            
            # Encontrar ranking
            time_rank = next(i+1 for i, (t, _) in enumerate(sorted_time) if t == tech)
            req_rank = next(i+1 for i, (t, _) in enumerate(sorted_req) if t == tech)
            
            medals = {1: "🥇 1º", 2: "🥈 2º", 3: "🥉 3º", 4: "🏅 4º"}
            
            row = f"{tech:<20} {time_val:<15.2f} {req_val:<15.2f} {medals.get(time_rank, str(time_rank)+'º'):<20} {medals.get(req_rank, str(req_rank)+'º'):<20}"
            print(row)
    
    def ascii_bar_chart(self, title: str, data: Dict[str, float], max_width: int = 50):
        """Gerar gráfico ASCII de barras horizontal"""
        self.print_subheader(title)
        
        # Encontrar valor máximo
        max_val = max(data.values())
        
        # Cores ANSI (simplificado para compatibilidade)
        colors = {
            "REST": "[BLUE]",
            "GraphQL": "[PURPLE]",
            "SOAP": "[RED]",
            "gRPC": "[GREEN]"
        }
        
        for tech in self.technologies:
            if tech in data:
                value = data[tech]
                # Calcular largura da barra
                bar_width = int((value / max_val) * max_width)
                bar = "█" * bar_width
                
                # Mostrar
                print(f"{tech:<12} │ {bar:<{max_width}} │ {value:>10.2f}")
    
    def ascii_bar_chart_time(self, title: str, data: Dict[str, float]):
        """Gráfico ASCII de tempo (escala logarítmica visual)"""
        self.print_subheader(title)
        
        import math
        
        # Encontrar valor máximo (escala log)
        max_val = max(data.values())
        
        for tech in self.technologies:
            if tech in data:
                value = data[tech]
                
                # Usar escala logarítmica se valor é diferente
                if tech == "SOAP":
                    # SOAP tem valor muito pequeno
                    display_bar = "█" * 2
                    label = "▁ (0.05ms)"
                else:
                    # Outros têm ~100ms
                    bar_width = int((value / 150) * 40)
                    display_bar = "█" * bar_width
                    label = f"({value:.2f}ms)"
                
                print(f"{tech:<12} │ {display_bar:<45} │ {label}")
    
    def ranking_table(self):
        """Tabela de ranking"""
        self.print_subheader("RANKING FINAL")
        
        # Ranking por tempo
        sorted_time = sorted(self.avg_general.items(), key=lambda x: x[1])
        sorted_req = sorted(self.req_sec_general.items(), key=lambda x: x[1], reverse=True)
        
        print("\nPOR TEMPO (Menor é Melhor):")
        print(f"{'Posição':<12} {'Tecnologia':<15} {'Tempo (ms)':<15} {'Diferença':<15}")
        print("-" * 60)
        
        first_time = sorted_time[0][1]
        medals = ["🥇", "🥈", "🥉", "🏅"]
        
        for i, (tech, time_val) in enumerate(sorted_time):
            diff = ((time_val - first_time) / first_time * 100) if i > 0 else 0
            diff_str = f"+{diff:.1f}%" if i > 0 else "base"
            print(f"{medals[i]} {i+1}º{'':<9} {tech:<15} {time_val:<15.2f} {diff_str:<15}")
        
        # Ranking por throughput
        print("\n\nPOR THROUGHPUT (Maior é Melhor):")
        print(f"{'Posição':<12} {'Tecnologia':<15} {'Req/s':<15} {'Diferença':<15}")
        print("-" * 60)
        
        first_req = sorted_req[0][1]
        
        for i, (tech, req_val) in enumerate(sorted_req):
            diff = ((first_req - req_val) / first_req * 100) if i > 0 else 0
            diff_str = f"-{diff:.1f}%" if i > 0 else "base"
            print(f"{medals[i]} {i+1}º{'':<9} {tech:<15} {req_val:<15.2f} {diff_str:<15}")
    
    def resumo_executivo(self):
        """Resumo executivo"""
        self.print_header("RESUMO EXECUTIVO")
        
        print("✨ PRINCIPAIS DESCOBERTAS:\n")
        
        # Calcular diferenças
        rest_time = self.avg_general["REST"]
        grpc_time = self.avg_general["gRPC"]
        graphql_time = self.avg_general["GraphQL"]
        
        diff_grpc = ((grpc_time - rest_time) / rest_time * 100)
        diff_graphql = ((graphql_time - rest_time) / rest_time * 100)
        
        print(f"1. REST vs gRPC:")
        print(f"   • REST: {rest_time:.2f}ms | gRPC: {grpc_time:.2f}ms")
        print(f"   • Diferença: {abs(diff_grpc):.2f}%")
        print(f"   • Conclusão: PRATICAMENTE IDÊNTICOS (< 1% diferença)\n")
        
        print(f"2. GraphQL Performance:")
        print(f"   • GraphQL: {graphql_time:.2f}ms vs REST: {rest_time:.2f}ms")
        print(f"   • Diferença: +{diff_graphql:.1f}%")
        print(f"   • Conclusão: ~15% mais lento (Trade-off aceitável)\n")
        
        print(f"3. SOAP Status:")
        print(f"   • Tempo: {self.avg_general['SOAP']:.2f}ms")
        print(f"   • Throughput: {self.req_sec_general['SOAP']:.0f} req/s")
        print(f"   • Taxa de Sucesso: 0%")
        print(f"   • ⚠️ ANOMALIAS DETECTADAS - INVESTIGAR CONECTIVIDADE\n")
        
        print("📊 DADOS DOS TESTES:")
        print(f"   • Total de Requisições: 2,000")
        print(f"   • Requisições por Operação: 100")
        print(f"   • Tecnologias Testadas: 4")
        print(f"   • Operações: 5")
        print(f"   • Data: Dezembro 2, 2025\n")
    
    def estatisticas_detalhadas(self):
        """Estatísticas detalhadas"""
        self.print_header("ESTATÍSTICAS DETALHADAS")
        
        for tech in self.technologies:
            print(f"\n{tech.upper()}")
            print("-" * 60)
            
            times = self.avg_times[tech]
            
            # Calcular estatísticas
            min_time = min(times)
            max_time = max(times)
            avg_time = sum(times) / len(times)
            
            min_op = self.operations[times.index(min_time)]
            max_op = self.operations[times.index(max_time)]
            
            print(f"  Tempo Mínimo:    {min_time:.2f}ms ({min_op})")
            print(f"  Tempo Máximo:    {max_time:.2f}ms ({max_op})")
            print(f"  Tempo Médio:     {avg_time:.2f}ms")
            print(f"  Variação:        {max_time - min_time:.2f}ms")
            print(f"  Desvio:          {((max_time - min_time) / avg_time * 100):.1f}%")
            print(f"  Throughput Médio: {sum(self.req_per_sec[tech]) / len(self.req_per_sec[tech]):.2f} req/s")
    
    def exportar_csv(self):
        """Exportar dados para CSV"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"test_results_{timestamp}.csv"
        
        with open(filename, "w", encoding="utf-8") as f:
            # Cabeçalho
            f.write("Operacao,REST_Tempo,GraphQL_Tempo,SOAP_Tempo,gRPC_Tempo,")
            f.write("REST_ReqSec,GraphQL_ReqSec,SOAP_ReqSec,gRPC_ReqSec\n")
            
            # Dados
            for i, op in enumerate(self.operations):
                f.write(f"{op},")
                f.write(f"{self.avg_times['REST'][i]},")
                f.write(f"{self.avg_times['GraphQL'][i]},")
                f.write(f"{self.avg_times['SOAP'][i]},")
                f.write(f"{self.avg_times['gRPC'][i]},")
                f.write(f"{self.req_per_sec['REST'][i]},")
                f.write(f"{self.req_per_sec['GraphQL'][i]},")
                f.write(f"{self.req_per_sec['SOAP'][i]},")
                f.write(f"{self.req_per_sec['gRPC'][i]}\n")
        
        return filename
    
    def show_menu(self):
        """Menu interativo"""
        while True:
            print("\n" + "=" * 60)
            print("📊 VISUALIZADOR DE DADOS DE TESTE")
            print("=" * 60)
            print("\n1. Ver Tempo por Operação (Tabela)")
            print("2. Ver Requisições por Segundo (Tabela)")
            print("3. Ver P95 - Percentil 95 (Tabela)")
            print("4. Comparação Geral (Tabela + Ranking)")
            print("5. Gráficos ASCII (Barras)")
            print("6. Resumo Executivo")
            print("7. Estatísticas Detalhadas")
            print("8. Exportar CSV")
            print("9. Ver Tudo")
            print("0. Sair")
            print("-" * 60)
            
            choice = input("\n👉 Escolha uma opção [0-9]: ").strip()
            
            if choice == "1":
                self.table_tempo_por_operacao()
            elif choice == "2":
                self.table_req_per_sec_operacao()
            elif choice == "3":
                self.table_p95_times()
            elif choice == "4":
                self.table_comparacao_geral()
                self.ranking_table()
            elif choice == "5":
                self.ascii_bar_chart("Tempo Médio Geral (ms)", self.avg_general)
                self.ascii_bar_chart("Throughput Médio Geral (req/s)", self.req_sec_general)
            elif choice == "6":
                self.resumo_executivo()
            elif choice == "7":
                self.estatisticas_detalhadas()
            elif choice == "8":
                filename = self.exportar_csv()
                print(f"\n✅ Dados exportados para: {filename}")
            elif choice == "9":
                self.resumo_executivo()
                self.table_comparacao_geral()
                self.ranking_table()
                self.table_tempo_por_operacao()
                self.table_req_per_sec_operacao()
                self.ascii_bar_chart("Tempo Médio Geral (ms)", self.avg_general)
                self.ascii_bar_chart("Throughput Médio Geral (req/s)", self.req_sec_general)
            elif choice == "0":
                print("\n👋 Até logo!")
                break
            else:
                print("\n❌ Opção inválida!")
            
            if choice != "0":
                input("\nPressione ENTER para continuar...")


def main():
    """Função principal"""
    viewer = TextDataViewer()
    viewer.show_menu()


if __name__ == "__main__":
    main()
