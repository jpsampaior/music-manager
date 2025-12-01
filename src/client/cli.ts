#!/usr/bin/env node

/**
 * Script de teste rápido do cliente de streaming de músicas
 * Uso: ts-node src/client/index.ts
 */

import { MusicStreamingClient } from './music-streaming.client';
import { ClientExamples } from './client-examples';
import { LoadTester } from './load-test';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🎵 Cliente de Streaming de Músicas\n');

  switch (command) {
    case 'examples':
      console.log('Executando exemplos...\n');
      const examples = new ClientExamples();
      await examples.runAll();
      break;

    case 'load-test':
      console.log('Executando testes de carga...\n');
      const tester = new LoadTester();
      const requestCount = parseInt(args[1]?.split('=')[1] || '100');
      await tester.runFullLoadTest(requestCount);
      break;

    case 'stress':
      console.log('Executando teste de estresse...\n');
      const stressTester = new LoadTester();
      await stressTester.runStressTest();
      break;

    case 'health':
      console.log('Verificando saúde dos serviços...\n');
      const client = new MusicStreamingClient();
      const health = await client.healthCheck();
      console.log('Status:');
      console.log(`  REST:   ${health.rest ? '✅' : '❌'}`);
      console.log(`  GraphQL: ${health.graphql ? '✅' : '❌'}`);
      console.log(`  SOAP:    ${health.soap ? '✅' : '❌'}\n`);
      break;

    case 'help':
    default:
      console.log('Comandos disponíveis:\n');
      console.log('  npm run client:examples       - Executar exemplos de todas as tecnologias');
      console.log('  npm run client:load-test      - Executar testes de carga (100 req)');
      console.log('  npm run client:load-test -- --requests=500 - Teste com 500 req');
      console.log('  npm run client:stress         - Executar teste de estresse (progressivo)');
      console.log('  npm run client:health         - Verificar saúde dos serviços\n');
      break;
  }
}

main().catch((err) => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
