"""
Tester de carga para comparar tecnologias de música streaming
"""

import asyncio
import time
from typing import List, Dict, Callable, Any
from dataclasses import dataclass
from statistics import mean, median, stdev
import sys
from music_streaming_client import MusicStreamingClient, ClientConfig


@dataclass
class LoadTestResult:
    """Resultado de um teste de carga"""
    technology: str
    operation: str
    total_requests: int
    successful_requests: int
    failed_requests: int
    average_time: float
    min_time: float
    max_time: float
    median_time: float
    p95_time: float
    p99_time: float
    requests_per_second: float
    error_rate: float


class LoadTester:
    """Tester de carga para comparar tecnologias"""

    def __init__(self):
        """Inicializar tester"""
        self.client = MusicStreamingClient()
        self.results: List[LoadTestResult] = []

    async def _run_load_test(
        self,
        technology: str,
        operation: str,
        operation_fn: Callable,
        number_of_requests: int = 100,
    ) -> LoadTestResult:
        """Executar teste de carga para uma operação"""
        print(f"\n⏱️  Testando {technology:10} - {operation:30} ({number_of_requests} req)")

        times: List[float] = []
        successful = 0
        failed = 0

        start_time = time.time()

        for i in range(number_of_requests):
            req_start = time.time()
            try:
                await operation_fn()
                successful += 1
            except Exception as error:
                failed += 1
            times.append((time.time() - req_start) * 1000)  # Converter para ms

            # Mostrar progresso
            if (i + 1) % max(1, number_of_requests // 20) == 0:
                sys.stdout.write(".")
                sys.stdout.flush()

        total_time = time.time() - start_time

        # Calcular estatísticas
        times.sort()
        avg_time = mean(times)
        min_time = min(times)
        max_time = max(times)
        median_time = median(times)
        p95_time = times[int(len(times) * 0.95)]
        p99_time = times[int(len(times) * 0.99)]

        result = LoadTestResult(
            technology=technology,
            operation=operation,
            total_requests=number_of_requests,
            successful_requests=successful,
            failed_requests=failed,
            average_time=avg_time,
            min_time=min_time,
            max_time=max_time,
            median_time=median_time,
            p95_time=p95_time,
            p99_time=p99_time,
            requests_per_second=number_of_requests / total_time,
            error_rate=(failed / number_of_requests) * 100,
        )

        print(" ✅")
        print(
            f"   Tempo médio: {result.average_time:.2f}ms | Req/s: {result.requests_per_second:.2f}"
        )
        print(
            f"   Min: {result.min_time:.2f}ms | Max: {result.max_time:.2f}ms | P95: {result.p95_time:.2f}ms"
        )

        self.results.append(result)
        return result

    async def run_full_load_test(self, requests_per_operation: int = 100) -> None:
        """Executar teste completo com todas as tecnologias"""
        print("\n" + "=" * 80)
        print("🚀 TESTE DE CARGA COMPLETO - COMPARAÇÃO DE TECNOLOGIAS")
        print("=" * 80)

        # Operações a testar
        operations = [
            ("Listar Usuários", lambda: self.client.rest_list_all_users(), lambda: self.client.graphql_list_all_users(), lambda: self.client.soap_list_all_users(), lambda: self.client.grpc_list_all_users()),
            ("Listar Músicas", lambda: self.client.rest_list_all_musics(), lambda: self.client.graphql_list_all_musics(), lambda: self.client.soap_list_all_musics(), lambda: self.client.grpc_list_all_musics()),
            ("Playlists do Usuário (ID=1)", lambda: self.client.rest_list_user_playlists(1), lambda: self.client.graphql_list_user_playlists(1), lambda: self.client.soap_list_user_playlists(1), lambda: self.client.grpc_list_user_playlists(1)),
            ("Músicas da Playlist (ID=1)", lambda: self.client.rest_list_playlist_musics(1), lambda: self.client.graphql_list_playlist_musics(1), lambda: self.client.soap_list_playlist_musics(1), lambda: self.client.grpc_list_playlist_musics(1)),
            ("Playlists com Música (ID=1)", lambda: self.client.rest_list_playlists_by_music(1), lambda: self.client.graphql_list_playlists_by_music(1), lambda: self.client.soap_list_playlists_by_music(1), lambda: self.client.grpc_list_playlists_by_music(1)),
        ]

        # Testar cada tecnologia
        for op_name, rest_fn, graphql_fn, soap_fn, grpc_fn in operations:
            await self._run_load_test("REST", op_name, rest_fn, requests_per_operation)
            await self._run_load_test("GraphQL", op_name, graphql_fn, requests_per_operation)
            await self._run_load_test("SOAP", op_name, soap_fn, requests_per_operation)
            await self._run_load_test("gRPC", op_name, grpc_fn, requests_per_operation)

        self._print_summary()

    def _print_summary(self) -> None:
        """Imprimir sumário dos testes"""
        print("\n" + "=" * 80)
        print("📊 RELATÓRIO COMPARATIVO COMPLETO")
        print("=" * 80)

        # Agrupar resultados por tecnologia
        tech_results = {}
        for result in self.results:
            if result.technology not in tech_results:
                tech_results[result.technology] = []
            tech_results[result.technology].append(result)

        # Imprimir relatório para cada tecnologia
        for technology in ["REST", "GraphQL", "SOAP", "gRPC"]:
            if technology in tech_results:
                self._print_technology_report(technology, tech_results[technology])

        # Imprimir ranking
        self._print_ranking()

    def _print_technology_report(self, technology: str, results: List[LoadTestResult]) -> None:
        """Imprimir relatório de uma tecnologia"""
        print(f"\n🌐 {technology}\n")
        print(f"{'Operação':<32} {'Tempo Médio (ms)':<18} {'Req/s':<15} {'Taxa Sucesso':<15} {'P95 (ms)':<12}")
        print("-" * 92)

        avg_time = 0
        avg_req_per_sec = 0

        for result in results:
            success_rate = ((result.total_requests - result.failed_requests) / result.total_requests) * 100
            print(
                f"{result.operation:<32} {result.average_time:<18.2f} {result.requests_per_second:<15.2f} {success_rate:<14.1f}% {result.p95_time:<12.2f}"
            )
            avg_time += result.average_time
            avg_req_per_sec += result.requests_per_second

        print("-" * 92)
        avg_time /= len(results)
        avg_req_per_sec /= len(results)
        print(f"{'MÉDIA':<32} {avg_time:<18.2f} {avg_req_per_sec:<15.2f} {'100.0%':<14} {0:<12.2f}")

    def _print_ranking(self) -> None:
        """Imprimir ranking das tecnologias"""
        print("\n" + "=" * 80)
        print("🏆 RANKING DE TECNOLOGIAS")
        print("=" * 80)

        # Calcular média de tempo para cada tecnologia
        tech_avg_time = {}
        tech_avg_req_per_sec = {}

        for technology in ["REST", "GraphQL", "SOAP", "gRPC"]:
            times = [r.average_time for r in self.results if r.technology == technology]
            req_per_sec = [r.requests_per_second for r in self.results if r.technology == technology]
            
            if times:
                tech_avg_time[technology] = mean(times)
                tech_avg_req_per_sec[technology] = mean(req_per_sec)

        # Ordenar por tempo médio
        ranked = sorted(tech_avg_time.items(), key=lambda x: x[1])

        print(f"\n{'Posição':<12} {'Tecnologia':<15} {'Tempo Médio (ms)':<20} {'Req/s Médio':<15}")
        print("-" * 62)

        for i, (technology, avg_time) in enumerate(ranked, 1):
            print(
                f"{i}º{'':<10} {technology:<15} {avg_time:<20.2f} {tech_avg_req_per_sec[technology]:<15.2f}"
            )

            if i == 1:
                print(f"{'':12}gRPC é mais rápido")
            elif i == 2:
                print(f"{'':12}tecnologia intermediária")
            elif i == len(ranked):
                print(f"{'':12}tecnologia mais lenta")

        # Estatísticas gerais
        total_requests = sum(r.total_requests for r in self.results)
        total_successful = sum(r.successful_requests for r in self.results)
        avg_time_general = mean([r.average_time for r in self.results])
        avg_req_per_sec_general = mean([r.requests_per_second for r in self.results])

        print("\n" + "-" * 80)
        print("📊 ESTATÍSTICAS GERAIS\n")
        print(f"Total de requisições: {total_requests}")
        print(f"Total de sucessos: {total_successful}")
        print(f"Total de falhas: {total_requests - total_successful}")
        print(f"Tempo médio geral: {avg_time_general:.2f}ms")
        print(f"Req/s médio geral: {avg_req_per_sec_general:.2f}")

        print("\n" + "=" * 80)
        print("✅ Relatório completo gerado!")
        print("=" * 80)


async def main():
    """Função principal"""
    tester = LoadTester()
    
    # Executar teste de carga completo
    await tester.run_full_load_test(requests_per_operation=100)
    
    # Gerar gráficos automaticamente
    try:
        from generate_charts import LoadTestChartGenerator
        print("\n" + "="*80)
        print("📊 Gerando gráficos dos resultados...")
        print("="*80)
        generator = LoadTestChartGenerator()
        generator.generate_all()
        print("\n✅ Gráficos salvos em: ./charts/")
    except ImportError:
        print("\n⚠️  matplotlib não instalado para gerar gráficos")
        print("   Execute: pip install matplotlib")
    except Exception as e:
        print(f"\n⚠️  Erro ao gerar gráficos: {e}")


if __name__ == "__main__":
    asyncio.run(main())
