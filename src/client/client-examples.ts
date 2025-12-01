import { MusicStreamingClient } from './music-streaming.client';

/**
 * Exemplos de uso do cliente de streaming de músicas
 */
export class ClientExamples {
  private client: MusicStreamingClient;

  constructor() {
    this.client = new MusicStreamingClient();
  }

  /**
   * Exemplo 1: Executar todas as 5 consultas com REST
   */
  async exampleRest() {
    console.log('\n🌐 EXEMPLO 1: REST API\n');

    try {
      // 1. Listar todos os usuários
      console.log('1️⃣  Listando todos os usuários...');
      const users = await this.client.restListAllUsers();
      console.log(`   ✅ ${users.length} usuários encontrados`);
      console.log('   ', users.slice(0, 2));

      // 2. Listar todas as músicas
      console.log('\n2️⃣  Listando todas as músicas...');
      const musics = await this.client.restListAllMusics();
      console.log(`   ✅ ${musics.length} músicas encontradas`);
      console.log('   ', musics.slice(0, 2));

      // 3. Listar playlists de um usuário
      if (users.length > 0) {
        console.log(`\n3️⃣  Listando playlists do usuário ${users[0].id}...`);
        const userPlaylists = await this.client.restListUserPlaylists(users[0].id);
        console.log(`   ✅ ${userPlaylists.length} playlists encontradas`);
        console.log('   ', userPlaylists.slice(0, 2));
      }

      // 4. Listar músicas de uma playlist
      console.log(`\n4️⃣  Listando músicas da primeira playlist...`);
      const playlistMusics = await this.client.restListPlaylistMusics(1);
      console.log(`   ✅ ${playlistMusics.length} músicas encontradas`);
      console.log('   ', playlistMusics.slice(0, 2));

      // 5. Listar playlists que contêm uma música
      if (musics.length > 0) {
        console.log(`\n5️⃣  Listando playlists com música ${musics[0].id}...`);
        const musicPlaylists = await this.client.restListPlaylistsByMusic(musics[0].id);
        console.log(`   ✅ ${musicPlaylists.length} playlists encontradas`);
        console.log('   ', musicPlaylists.slice(0, 2));
      }

      console.log('\n✅ Exemplo REST concluído!\n');
    } catch (error) {
      console.error('❌ Erro no exemplo REST:', error);
    }
  }

  /**
   * Exemplo 2: Executar todas as 5 consultas com GraphQL
   */
  async exampleGraphQL() {
    console.log('\n🔷 EXEMPLO 2: GraphQL\n');

    try {
      // 1. Listar todos os usuários
      console.log('1️⃣  Listando todos os usuários...');
      const users = await this.client.graphqlListAllUsers();
      console.log(`   ✅ ${users.length} usuários encontrados`);
      console.log('   ', users.slice(0, 2));

      // 2. Listar todas as músicas
      console.log('\n2️⃣  Listando todas as músicas...');
      const musics = await this.client.graphqlListAllMusics();
      console.log(`   ✅ ${musics.length} músicas encontradas`);
      console.log('   ', musics.slice(0, 2));

      // 3. Listar playlists de um usuário
      if (users.length > 0) {
        console.log(`\n3️⃣  Listando playlists do usuário ${users[0].id}...`);
        const userPlaylists = await this.client.graphqlListUserPlaylists(users[0].id);
        console.log(`   ✅ ${userPlaylists.length} playlists encontradas`);
        console.log('   ', userPlaylists.slice(0, 2));
      }

      // 4. Listar músicas de uma playlist
      console.log(`\n4️⃣  Listando músicas da primeira playlist...`);
      const playlistMusics = await this.client.graphqlListPlaylistMusics(1);
      console.log(`   ✅ ${playlistMusics.length} músicas encontradas`);
      console.log('   ', playlistMusics.slice(0, 2));

      // 5. Listar playlists que contêm uma música
      if (musics.length > 0) {
        console.log(`\n5️⃣  Listando playlists com música ${musics[0].id}...`);
        const musicPlaylists = await this.client.graphqlListPlaylistsByMusic(musics[0].id);
        console.log(`   ✅ ${musicPlaylists.length} playlists encontradas`);
        console.log('   ', musicPlaylists.slice(0, 2));
      }

      console.log('\n✅ Exemplo GraphQL concluído!\n');
    } catch (error) {
      console.error('❌ Erro no exemplo GraphQL:', error);
    }
  }

  /**
   * Exemplo 3: Executar todas as 5 consultas com SOAP
   */
  async exampleSoap() {
    console.log('\n📦 EXEMPLO 3: SOAP\n');

    try {
      // 1. Listar todos os usuários
      console.log('1️⃣  Listando todos os usuários...');
      const users = await this.client.soapListAllUsers();
      console.log(`   ✅ ${users.length} usuários encontrados`);
      console.log('   ', users.slice(0, 2));

      // 2. Listar todas as músicas
      console.log('\n2️⃣  Listando todas as músicas...');
      const musics = await this.client.soapListAllMusics();
      console.log(`   ✅ ${musics.length} músicas encontradas`);
      console.log('   ', musics.slice(0, 2));

      // 3. Listar playlists de um usuário
      if (users.length > 0) {
        console.log(`\n3️⃣  Listando playlists do usuário ${users[0].id}...`);
        const userPlaylists = await this.client.soapListUserPlaylists(users[0].id);
        console.log(`   ✅ ${userPlaylists.length} playlists encontradas`);
        console.log('   ', userPlaylists.slice(0, 2));
      }

      // 4. Listar músicas de uma playlist
      console.log(`\n4️⃣  Listando músicas da primeira playlist...`);
      const playlistMusics = await this.client.soapListPlaylistMusics(1);
      console.log(`   ✅ ${playlistMusics.length} músicas encontradas`);
      console.log('   ', playlistMusics.slice(0, 2));

      // 5. Listar playlists que contêm uma música
      if (musics.length > 0) {
        console.log(`\n5️⃣  Listando playlists com música ${musics[0].id}...`);
        const musicPlaylists = await this.client.soapListPlaylistsByMusic(musics[0].id);
        console.log(`   ✅ ${musicPlaylists.length} playlists encontradas`);
        console.log('   ', musicPlaylists.slice(0, 2));
      }

      console.log('\n✅ Exemplo SOAP concluído!\n');
    } catch (error) {
      console.error('❌ Erro no exemplo SOAP:', error);
    }
  }

  /**
   * Exemplo 4: Health Check de todas as tecnologias
   */
  async healthCheckExample() {
    console.log('\n🏥 EXEMPLO 4: Health Check\n');

    const health = await this.client.healthCheck();
    const status = (isHealthy: boolean) => (isHealthy ? '✅' : '❌');

    console.log(`${status(health.rest)} REST API`);
    console.log(`${status(health.graphql)} GraphQL`);
    console.log(`${status(health.soap)} SOAP`);
    console.log(`${status(health.grpc)} gRPC`);

    console.log('\n✅ Health check concluído!\n');
  }

  /**
   * Exemplo 5: Executar todas as 5 consultas com gRPC
   */
  async exampleGrpc() {
    console.log('\n📡 EXEMPLO 5: gRPC\n');

    try {
      // 1. Listar todos os usuários
      console.log('1️⃣  Listando todos os usuários...');
      const users = await this.client.grpcListAllUsers();
      console.log(`   ✅ ${users.length} usuários encontrados`);
      console.log('   ', users.slice(0, 2));

      // 2. Listar todas as músicas
      console.log('\n2️⃣  Listando todas as músicas...');
      const musics = await this.client.grpcListAllMusics();
      console.log(`   ✅ ${musics.length} músicas encontradas`);
      console.log('   ', musics.slice(0, 2));

      // 3. Listar playlists de um usuário
      if (users.length > 0) {
        console.log(`\n3️⃣  Listando playlists do usuário ${users[0].id}...`);
        const userPlaylists = await this.client.grpcListUserPlaylists(users[0].id);
        console.log(`   ✅ ${userPlaylists.length} playlists encontradas`);
        console.log('   ', userPlaylists.slice(0, 2));
      }

      // 4. Listar músicas de uma playlist
      console.log(`\n4️⃣  Listando músicas da primeira playlist...`);
      const playlistMusics = await this.client.grpcListPlaylistMusics(1);
      console.log(`   ✅ ${playlistMusics.length} músicas encontradas`);
      console.log('   ', playlistMusics.slice(0, 2));

      // 5. Listar playlists que contêm uma música
      if (musics.length > 0) {
        console.log(`\n5️⃣  Listando playlists com música ${musics[0].id}...`);
        const musicPlaylists = await this.client.grpcListPlaylistsByMusic(musics[0].id);
        console.log(`   ✅ ${musicPlaylists.length} playlists encontradas`);
        console.log('   ', musicPlaylists.slice(0, 2));
      }

      console.log('\n✅ Exemplo gRPC concluído!\n');
    } catch (error) {
      console.error('❌ Erro no exemplo gRPC:', error);
    }
  }

  /**
   * Executar todos os exemplos
   */
  async runAll() {
    console.log('🎵 CLIENTE DE STREAMING DE MÚSICAS - EXEMPLOS\n');
    console.log('═'.repeat(60));

    // Verificar saúde primeiro
    await this.healthCheckExample();

    // Executar exemplos
    await this.exampleRest();
    await this.exampleGraphQL();
    await this.exampleSoap();
    await this.exampleGrpc();

    console.log('═'.repeat(60));
    console.log('✅ Todos os exemplos executados!\n');
  }
}

// Executar quando chamado diretamente
if (require.main === module) {
  const examples = new ClientExamples();
  examples.runAll().catch(console.error);
}

export default ClientExamples;
