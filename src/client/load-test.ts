import { MusicStreamingClient } from './music-streaming.client';

/**
 * Resultado de um teste de carga
 */
export interface LoadTestResult {
  technology: string;
  operation: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  medianTime: number;
  p95Time: number;
  p99Time: number;
  requestsPerSecond: number;
  errorRate: number;
}

/**
 * Tester de carga para comparar tecnologias
 */
export class LoadTester {
  private client: MusicStreamingClient;
  private results: LoadTestResult[] = [];

  constructor() {
    this.client = new MusicStreamingClient();
  }

  /**
   * Executar teste de carga para uma operação
   */
  private async runLoadTest(
    technology: string,
    operation: string,
    operationFn: () => Promise<any>,
    numberOfRequests: number = 100,
  ): Promise<LoadTestResult> {
    console.log(
      `\n⏱️  Testando ${technology.padEnd(10)} - ${operation.padEnd(30)} (${numberOfRequests} req)`,
    );

    const times: number[] = [];
    let successful = 0;
    let failed = 0;

    const startTime = performance.now();

    for (let i = 0; i < numberOfRequests; i++) {
      const reqStart = performance.now();
      try {
        await operationFn();
        successful++;
      } catch (error) {
        failed++;
      }
      times.push(performance.now() - reqStart);

      // Mostrar progresso
      if ((i + 1) % Math.ceil(numberOfRequests / 20) === 0) {
        process.stdout.write('.');
      }
    }

    const totalTime = (performance.now() - startTime) / 1000;

    // Calcular estatísticas
    times.sort((a, b) => a - b);
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const medianTime = times[Math.floor(times.length / 2)];
    const p95Time = times[Math.ceil(times.length * 0.95)];
    const p99Time = times[Math.ceil(times.length * 0.99)];

    const result: LoadTestResult = {
      technology,
      operation,
      totalRequests: numberOfRequests,
      successfulRequests: successful,
      failedRequests: failed,
      averageTime: avgTime,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      medianTime,
      p95Time,
      p99Time,
      requestsPerSecond: numberOfRequests / totalTime,
      errorRate: (failed / numberOfRequests) * 100,
    };

    console.log(' ✅');
    console.log(
      `   Tempo médio: ${result.averageTime.toFixed(2)}ms | Req/s: ${result.requestsPerSecond.toFixed(2)}`,
    );
    console.log(
      `   Min: ${result.minTime.toFixed(2)}ms | Max: ${result.maxTime.toFixed(2)}ms | P95: ${result.p95Time.toFixed(2)}ms`,
    );

    this.results.push(result);
    return result;
  }

  /**
   * Executar suite completa de testes
   */
  async runFullLoadTest(numberOfRequests: number = 100) {
    console.log('🚀 TESTE DE CARGA COMPLETO\n');
    console.log(`📊 Requisições por teste: ${numberOfRequests}\n`);
    console.log('═'.repeat(90));

    const operations = [
      {
        name: 'Listar Usuários',
        restFn: () => this.client.restListAllUsers(),
        graphqlFn: () => this.client.graphqlListAllUsers(),
        soapFn: () => this.client.soapListAllUsers(),
        grpcFn: () => this.client.grpcListAllUsers(),
      },
      {
        name: 'Listar Músicas',
        restFn: () => this.client.restListAllMusics(),
        graphqlFn: () => this.client.graphqlListAllMusics(),
        soapFn: () => this.client.soapListAllMusics(),
        grpcFn: () => this.client.grpcListAllMusics(),
      },
      {
        name: 'Playlists do Usuário (ID=1)',
        restFn: () => this.client.restListUserPlaylists(1),
        graphqlFn: () => this.client.graphqlListUserPlaylists(1),
        soapFn: () => this.client.soapListUserPlaylists(1),
        grpcFn: () => this.client.grpcListUserPlaylists(1),
      },
      {
        name: 'Músicas da Playlist (ID=1)',
        restFn: () => this.client.restListPlaylistMusics(1),
        graphqlFn: () => this.client.graphqlListPlaylistMusics(1),
        soapFn: () => this.client.soapListPlaylistMusics(1),
        grpcFn: () => this.client.grpcListPlaylistMusics(1),
      },
      {
        name: 'Playlists com Música (ID=1)',
        restFn: () => this.client.restListPlaylistsByMusic(1),
        graphqlFn: () => this.client.graphqlListPlaylistsByMusic(1),
        soapFn: () => this.client.soapListPlaylistsByMusic(1),
        grpcFn: () => this.client.grpcListPlaylistsByMusic(1),
      },
    ];

    // Executar testes
    for (const op of operations) {
      await this.runLoadTest('REST', op.name, op.restFn, numberOfRequests);
      await this.runLoadTest('GraphQL', op.name, op.graphqlFn, numberOfRequests);
      await this.runLoadTest('SOAP', op.name, op.soapFn, numberOfRequests);
      await this.runLoadTest('gRPC', op.name, op.grpcFn, numberOfRequests);
    }

    // Gerar relatório
    this.generateReport();
  }

  /**
   * Teste de estresse - aumentar carga progressivamente
   */
  async runStressTest() {
    console.log('\n💪 TESTE DE ESTRESSE (CARGA PROGRESSIVA)\n');
    console.log('═'.repeat(90));

    const cargas = [10, 50, 100, 200, 500];

    for (const carga of cargas) {
      console.log(`\n${'─'.repeat(90)}`);
      console.log(`📍 CARGA: ${carga} requisições`);
      console.log('─'.repeat(90));

      this.results = [];

      await this.runLoadTest(
        'REST',
        'Listar Usuários',
        () => this.client.restListAllUsers(),
        carga,
      );

      await this.runLoadTest(
        'GraphQL',
        'Listar Usuários',
        () => this.client.graphqlListAllUsers(),
        carga,
      );

      await this.runLoadTest(
        'SOAP',
        'Listar Usuários',
        () => this.client.soapListAllUsers(),
        carga,
      );

      await this.runLoadTest(
        'gRPC',
        'Listar Usuários',
        () => this.client.grpcListAllUsers(),
        carga,
      );

      // Mostrar resumo da carga
      this.printCargoSummary(carga);
    }
  }

  /**
   * Imprimir resumo de uma carga
   */
  private printCargoSummary(carga: number) {
    console.log(`\n📈 Resumo da carga ${carga}:`);

    const byTech = new Map<string, LoadTestResult[]>();
    this.results.forEach((r) => {
      if (!byTech.has(r.technology)) {
        byTech.set(r.technology, []);
      }
      byTech.get(r.technology)!.push(r);
    });

    byTech.forEach((results, tech) => {
      const avgTime = results.reduce((a, b) => a + b.averageTime, 0) / results.length;
      const avgRps = results.reduce((a, b) => a + b.requestsPerSecond, 0) / results.length;
      const totalErrors = results.reduce((a, b) => a + b.failedRequests, 0);

      console.log(
        `  ${tech.padEnd(10)}: ${avgTime.toFixed(2)}ms | ${avgRps.toFixed(2)} req/s | Erros: ${totalErrors}`,
      );
    });
  }

  /**
   * Gerar relatório comparativo detalhado
   */
  private generateReport() {
    console.log('\n\n' + '═'.repeat(90));
    console.log('📊 RELATÓRIO COMPARATIVO COMPLETO');
    console.log('═'.repeat(90));

    // Agrupar por tecnologia
    const byTechnology = new Map<string, LoadTestResult[]>();
    this.results.forEach((result) => {
      if (!byTechnology.has(result.technology)) {
        byTechnology.set(result.technology, []);
      }
      byTechnology.get(result.technology)!.push(result);
    });

    // Exibir relatório por tecnologia
    byTechnology.forEach((results, tech) => {
      console.log(`\n🔹 ${tech}\n`);
      console.log(
        'Operação'.padEnd(35) +
          'Tempo Médio (ms)'.padEnd(18) +
          'Req/s'.padEnd(12) +
          'Taxa Sucesso'.padEnd(15) +
          'P95 (ms)',
      );
      console.log('─'.repeat(90));

      results.forEach((result) => {
        const successRate = ((result.successfulRequests / result.totalRequests) * 100).toFixed(1);
        console.log(
          result.operation.padEnd(35) +
            result.averageTime.toFixed(2).padEnd(18) +
            result.requestsPerSecond.toFixed(2).padEnd(12) +
            `${successRate}%`.padEnd(15) +
            result.p95Time.toFixed(2),
        );
      });

      const avgTime = results.reduce((a, b) => a + b.averageTime, 0) / results.length;
      const avgRps = results.reduce((a, b) => a + b.requestsPerSecond, 0) / results.length;
      const avgP95 = results.reduce((a, b) => a + b.p95Time, 0) / results.length;

      console.log('─'.repeat(90));
      console.log(
        'MÉDIA'.padEnd(35) +
          avgTime.toFixed(2).padEnd(18) +
          avgRps.toFixed(2).padEnd(12) +
          '100.0%'.padEnd(15) +
          avgP95.toFixed(2),
      );
    });

    // Comparação entre tecnologias
    console.log('\n\n' + '─'.repeat(90));
    console.log('🏆 RANKING DE TECNOLOGIAS');
    console.log('─'.repeat(90));

    const techComparison = new Map<string, { totalTime: number; totalRps: number; count: number }>();

    this.results.forEach((result) => {
      if (!techComparison.has(result.technology)) {
        techComparison.set(result.technology, {
          totalTime: 0,
          totalRps: 0,
          count: 0,
        });
      }
      const current = techComparison.get(result.technology)!;
      current.totalTime += result.averageTime;
      current.totalRps += result.requestsPerSecond;
      current.count += 1;
    });

    const sorted = Array.from(techComparison.entries())
      .map(([tech, data]) => ({
        tech,
        avgTime: data.totalTime / data.count,
        avgRps: data.totalRps / data.count,
      }))
      .sort((a, b) => a.avgTime - b.avgTime);

    console.log('Posição'.padEnd(10) + 'Tecnologia'.padEnd(15) + 'Tempo Médio (ms)'.padEnd(20) + 'Req/s Médio');
    console.log('─'.repeat(90));

    sorted.forEach((item, index) => {
      const medals = ['🥇', '🥈', '🥉'];
      const medal = medals[index] || '  ';
      const position = `${index + 1}°`;
      console.log(
        position.padEnd(10) +
          item.tech.padEnd(15) +
          item.avgTime.toFixed(2).padEnd(20) +
          item.avgRps.toFixed(2),
      );
      console.log(`${medal} ${item.tech} é ${index === 0 ? 'mais rápido' : index === 1 ? 'intermediário' : 'mais lento'}\n`);
    });

    // Estatísticas gerais
    console.log('─'.repeat(90));
    console.log('\n📌 ESTATÍSTICAS GERAIS\n');
    console.log(`Total de requisições: ${this.results.reduce((a, b) => a + b.totalRequests, 0)}`);
    console.log(`Total de sucessos: ${this.results.reduce((a, b) => a + b.successfulRequests, 0)}`);
    console.log(`Total de falhas: ${this.results.reduce((a, b) => a + b.failedRequests, 0)}`);

    const totalTime = this.results.reduce((a, b) => a + b.averageTime, 0) / this.results.length;
    const totalRps = this.results.reduce((a, b) => a + b.requestsPerSecond, 0) / this.results.length;

    console.log(`Tempo médio geral: ${totalTime.toFixed(2)}ms`);
    console.log(`Req/s médio geral: ${totalRps.toFixed(2)}`);

    console.log('\n' + '═'.repeat(90));
    console.log('✅ Relatório completo gerado!\n');
  }
}

// Executar quando chamado diretamente
async function main() {
  const tester = new LoadTester();

  const args = process.argv.slice(2);
  const stressMode = args.includes('--stress');
  const requestCount = parseInt(args.find((a) => a.startsWith('--requests='))?.split('=')[1] || '100');

  if (stressMode) {
    await tester.runStressTest();
  } else {
    await tester.runFullLoadTest(requestCount);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export default LoadTester;
