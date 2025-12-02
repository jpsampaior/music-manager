"""
Gerador de gráficos para resultados de testes de carga
Cria visualizações comparativas das 4 tecnologias
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib import rcParams
import numpy as np
from typing import Dict, List
import os

# Configurar matplotlib para usar fonte que suporta português
rcParams['font.family'] = 'DejaVu Sans'

class LoadTestChartGenerator:
    """Gerador de gráficos para testes de carga"""
    
    def __init__(self):
        """Inicializar gerador"""
        self.output_dir = "charts"
        self._create_output_dir()
        
        # Dados dos testes
        self.technologies = ["REST", "GraphQL", "SOAP", "gRPC"]
        self.colors = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71"]
        
        # Operações testadas
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
        
        # Média geral
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
    
    def _create_output_dir(self):
        """Criar diretório de saída"""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
    
    def generate_all(self):
        """Gerar todos os gráficos"""
        print("\n" + "="*80)
        print("📊 GERANDO GRAFICOS DE TESTE DE CARGA")
        print("="*80 + "\n")
        
        self.chart_avg_time_by_operation()
        self.chart_req_per_sec_by_operation()
        self.chart_avg_time_comparison()
        self.chart_req_per_sec_comparison()
        self.chart_radar_comparison()
        self.chart_heatmap_time()
        self.chart_heatmap_req_sec()
        self.chart_overall_ranking()
        
        print("\n✅ Todos os gráficos foram gerados com sucesso!")
        print(f"📁 Localização: {os.path.abspath(self.output_dir)}/\n")
    
    def chart_avg_time_by_operation(self):
        """Gráfico: Tempo médio por operação"""
        fig, ax = plt.subplots(figsize=(14, 6))
        
        x = np.arange(len(self.operations))
        width = 0.2
        
        for i, tech in enumerate(self.technologies):
            offset = (i - 1.5) * width
            values = self.avg_times[tech]
            ax.bar(x + offset, values, width, label=tech, color=self.colors[i], alpha=0.8)
        
        ax.set_xlabel("Operações", fontsize=12, fontweight='bold')
        ax.set_ylabel("Tempo Médio (ms)", fontsize=12, fontweight='bold')
        ax.set_title("⏱️  Tempo Médio por Operação (100 req cada)", fontsize=14, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(self.operations, rotation=45, ha='right')
        ax.legend(loc='upper left', fontsize=10)
        ax.grid(axis='y', alpha=0.3)
        
        # SOAP tem valores muito pequenos, usar escala logarítmica
        ax.set_yscale('log')
        ax.set_ylabel("Tempo Médio (ms) - Escala Logarítmica", fontsize=12, fontweight='bold')
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/01_tempo_medio_por_operacao.png", dpi=300, bbox_inches='tight')
        print("✅ 01_tempo_medio_por_operacao.png")
        plt.close()
    
    def chart_req_per_sec_by_operation(self):
        """Gráfico: Requisições por segundo por operação"""
        fig, ax = plt.subplots(figsize=(14, 6))
        
        x = np.arange(len(self.operations))
        width = 0.2
        
        for i, tech in enumerate(self.technologies):
            offset = (i - 1.5) * width
            values = self.req_per_sec[tech]
            ax.bar(x + offset, values, width, label=tech, color=self.colors[i], alpha=0.8)
        
        ax.set_xlabel("Operações", fontsize=12, fontweight='bold')
        ax.set_ylabel("Requisições por Segundo", fontsize=12, fontweight='bold')
        ax.set_title("📈 Throughput por Operação (Req/s)", fontsize=14, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(self.operations, rotation=45, ha='right')
        ax.legend(loc='upper right', fontsize=10)
        ax.grid(axis='y', alpha=0.3)
        
        # SOAP tem valores muito altos, usar escala logarítmica
        ax.set_yscale('log')
        ax.set_ylabel("Requisições por Segundo - Escala Logarítmica", fontsize=12, fontweight='bold')
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/02_requisicoes_por_segundo.png", dpi=300, bbox_inches='tight')
        print("✅ 02_requisicoes_por_segundo.png")
        plt.close()
    
    def chart_avg_time_comparison(self):
        """Gráfico: Comparação geral de tempo médio"""
        fig, ax = plt.subplots(figsize=(10, 6))
        
        techs = list(self.avg_general.keys())
        times = list(self.avg_general.values())
        
        bars = ax.barh(techs, times, color=self.colors, alpha=0.8, edgecolor='black', linewidth=2)
        
        # Adicionar valores nas barras
        for i, (bar, value) in enumerate(zip(bars, times)):
            ax.text(value + 2, bar.get_y() + bar.get_height()/2, 
                   f'{value:.2f}ms', va='center', fontweight='bold', fontsize=11)
        
        ax.set_xlabel("Tempo Médio (ms)", fontsize=12, fontweight='bold')
        ax.set_title("🏆 Tempo Médio Geral - Comparação das Tecnologias", fontsize=14, fontweight='bold')
        ax.set_xscale('log')
        ax.grid(axis='x', alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/03_comparacao_tempo_geral.png", dpi=300, bbox_inches='tight')
        print("✅ 03_comparacao_tempo_geral.png")
        plt.close()
    
    def chart_req_per_sec_comparison(self):
        """Gráfico: Comparação geral de req/s"""
        fig, ax = plt.subplots(figsize=(10, 6))
        
        techs = list(self.req_sec_general.keys())
        req_sec = list(self.req_sec_general.values())
        
        bars = ax.barh(techs, req_sec, color=self.colors, alpha=0.8, edgecolor='black', linewidth=2)
        
        # Adicionar valores nas barras
        for i, (bar, value) in enumerate(zip(bars, req_sec)):
            ax.text(value * 0.5, bar.get_y() + bar.get_height()/2, 
                   f'{value:.2f}', va='center', fontweight='bold', fontsize=11, color='white')
        
        ax.set_xlabel("Requisições por Segundo", fontsize=12, fontweight='bold')
        ax.set_title("⚡ Throughput Médio Geral - Comparação das Tecnologias", fontsize=14, fontweight='bold')
        ax.set_xscale('log')
        ax.grid(axis='x', alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/04_comparacao_req_per_sec.png", dpi=300, bbox_inches='tight')
        print("✅ 04_comparacao_req_per_sec.png")
        plt.close()
    
    def chart_radar_comparison(self):
        """Gráfico: Radar comparativo (normalizado)"""
        fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))
        
        # Normalizar dados para radar
        angles = np.linspace(0, 2 * np.pi, len(self.operations), endpoint=False).tolist()
        angles += angles[:1]  # Completar o círculo
        
        for i, tech in enumerate(self.technologies):
            # Normalizar tempos (valores menores são melhores)
            values = [100 / t if t > 0 else 0 for t in self.avg_times[tech]]
            values += values[:1]  # Completar o círculo
            
            ax.plot(angles, values, 'o-', linewidth=2, label=tech, color=self.colors[i])
            ax.fill(angles, values, alpha=0.15, color=self.colors[i])
        
        ax.set_xticks(angles[:-1])
        ax.set_xticklabels(self.operations, size=10)
        ax.set_ylim(0, max([max([100 / t if t > 0 else 0 for t in self.avg_times[tech]]) 
                            for tech in self.technologies]) * 1.1)
        ax.set_title("🎯 Comparação Radar - Performance Normalizada", 
                    fontsize=14, fontweight='bold', pad=20)
        ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), fontsize=11)
        ax.grid(True)
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/05_radar_comparison.png", dpi=300, bbox_inches='tight')
        print("✅ 05_radar_comparison.png")
        plt.close()
    
    def chart_heatmap_time(self):
        """Gráfico: Heatmap de tempo médio"""
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Preparar dados para heatmap
        data = np.array([self.avg_times[tech] for tech in self.technologies])
        
        # Usar escala logarítmica para melhor visualização
        data_log = np.log10(data + 0.001)  # Adicionar pequeno valor para evitar log(0)
        
        im = ax.imshow(data_log, cmap='RdYlGn_r', aspect='auto')
        
        # Configurar eixos
        ax.set_xticks(np.arange(len(self.operations)))
        ax.set_yticks(np.arange(len(self.technologies)))
        ax.set_xticklabels(self.operations, rotation=45, ha='right')
        ax.set_yticklabels(self.technologies)
        
        # Adicionar valores nas células
        for i in range(len(self.technologies)):
            for j in range(len(self.operations)):
                value = self.avg_times[self.technologies[i]][j]
                text = ax.text(j, i, f'{value:.2f}ms',
                             ha="center", va="center", color="black", fontsize=9, fontweight='bold')
        
        ax.set_title("🔥 Heatmap - Tempo Médio por Operação", fontsize=14, fontweight='bold')
        
        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Log10(Tempo em ms)', rotation=270, labelpad=20)
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/06_heatmap_tempo.png", dpi=300, bbox_inches='tight')
        print("✅ 06_heatmap_tempo.png")
        plt.close()
    
    def chart_heatmap_req_sec(self):
        """Gráfico: Heatmap de req/s"""
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Preparar dados para heatmap
        data = np.array([self.req_per_sec[tech] for tech in self.technologies])
        
        # Usar escala logarítmica
        data_log = np.log10(data + 1)
        
        im = ax.imshow(data_log, cmap='YlGn', aspect='auto')
        
        # Configurar eixos
        ax.set_xticks(np.arange(len(self.operations)))
        ax.set_yticks(np.arange(len(self.technologies)))
        ax.set_xticklabels(self.operations, rotation=45, ha='right')
        ax.set_yticklabels(self.technologies)
        
        # Adicionar valores nas células
        for i in range(len(self.technologies)):
            for j in range(len(self.operations)):
                value = self.req_per_sec[self.technologies[i]][j]
                # Usar escala reduzida para valores grandes
                display_value = f'{value:.1f}' if value < 100 else f'{value/1000:.1f}k'
                text = ax.text(j, i, display_value,
                             ha="center", va="center", color="black", fontsize=9, fontweight='bold')
        
        ax.set_title("💨 Heatmap - Throughput (Req/s) por Operação", fontsize=14, fontweight='bold')
        
        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Log10(Req/s)', rotation=270, labelpad=20)
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/07_heatmap_req_sec.png", dpi=300, bbox_inches='tight')
        print("✅ 07_heatmap_req_sec.png")
        plt.close()
    
    def chart_overall_ranking(self):
        """Gráfico: Ranking geral"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
        
        # Ranking por tempo (menor é melhor)
        sorted_time = sorted(self.avg_general.items(), key=lambda x: x[1])
        techs_time = [x[0] for x in sorted_time]
        times = [x[1] for x in sorted_time]
        
        colors_ranked = [self.colors[self.technologies.index(tech)] for tech in techs_time]
        medals = ['🥇', '🥈', '🥉', '🏅']
        
        bars1 = ax1.barh(range(len(techs_time)), times, color=colors_ranked, alpha=0.8, edgecolor='black', linewidth=2)
        ax1.set_yticks(range(len(techs_time)))
        ax1.set_yticklabels([f"{medals[i]} {tech}" for i, tech in enumerate(techs_time)], fontsize=11, fontweight='bold')
        ax1.set_xlabel("Tempo Médio (ms)", fontsize=12, fontweight='bold')
        ax1.set_title("🏆 Ranking por Tempo (Menor é Melhor)", fontsize=13, fontweight='bold')
        ax1.set_xscale('log')
        ax1.grid(axis='x', alpha=0.3)
        
        # Adicionar valores
        for i, (bar, value) in enumerate(zip(bars1, times)):
            ax1.text(value * 2, bar.get_y() + bar.get_height()/2, 
                    f'{value:.3f}ms', va='center', fontweight='bold', fontsize=10)
        
        # Ranking por throughput (maior é melhor)
        sorted_req = sorted(self.req_sec_general.items(), key=lambda x: x[1], reverse=True)
        techs_req = [x[0] for x in sorted_req]
        req_secs = [x[1] for x in sorted_req]
        
        colors_ranked_req = [self.colors[self.technologies.index(tech)] for tech in techs_req]
        
        bars2 = ax2.barh(range(len(techs_req)), req_secs, color=colors_ranked_req, alpha=0.8, edgecolor='black', linewidth=2)
        ax2.set_yticks(range(len(techs_req)))
        ax2.set_yticklabels([f"{medals[i]} {tech}" for i, tech in enumerate(techs_req)], fontsize=11, fontweight='bold')
        ax2.set_xlabel("Requisições por Segundo", fontsize=12, fontweight='bold')
        ax2.set_title("⚡ Ranking por Throughput (Maior é Melhor)", fontsize=13, fontweight='bold')
        ax2.set_xscale('log')
        ax2.grid(axis='x', alpha=0.3)
        
        # Adicionar valores
        for i, (bar, value) in enumerate(zip(bars2, req_secs)):
            display_val = f'{value:.1f}' if value < 100 else f'{value/1000:.1f}k'
            ax2.text(value * 0.3, bar.get_y() + bar.get_height()/2, 
                    display_val, va='center', fontweight='bold', fontsize=10, color='white')
        
        plt.tight_layout()
        plt.savefig(f"{self.output_dir}/08_ranking_geral.png", dpi=300, bbox_inches='tight')
        print("✅ 08_ranking_geral.png")
        plt.close()


def main():
    """Função principal"""
    generator = LoadTestChartGenerator()
    generator.generate_all()
    
    print("\n" + "="*80)
    print("📊 GRÁFICOS GERADOS COM SUCESSO!")
    print("="*80)
    print("\nArquivos criados:")
    print("  01_tempo_medio_por_operacao.png - Tempo por operação (escala log)")
    print("  02_requisicoes_por_segundo.png - Throughput por operação (escala log)")
    print("  03_comparacao_tempo_geral.png - Tempo médio geral (ranking)")
    print("  04_comparacao_req_per_sec.png - Throughput médio geral (ranking)")
    print("  05_radar_comparison.png - Comparação radar normalizada")
    print("  06_heatmap_tempo.png - Heatmap de tempo médio")
    print("  07_heatmap_req_sec.png - Heatmap de throughput")
    print("  08_ranking_geral.png - Ranking final (2 gráficos)")
    print("="*80 + "\n")


if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("\n❌ Erro: matplotlib não instalado")
        print("   Execute: pip install matplotlib numpy")
    except Exception as e:
        print(f"\n❌ Erro ao gerar gráficos: {e}")
