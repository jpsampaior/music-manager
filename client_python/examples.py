"""
Exemplos de uso do cliente de música streaming
Demonstra como usar o cliente com as 4 tecnologias
"""

import asyncio
from music_streaming_client import MusicStreamingClient


async def example_rest():
    """Exemplo: Usando REST"""
    print("\n" + "=" * 80)
    print("📡 EXEMPLO 1: REST API")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        print("\n1️⃣  Listando todos os usuários (REST)...")
        users = await client.rest_list_all_users()
        print(f"   ✅ {len(users)} usuários encontrados")
        for user in users[:3]:
            print(f"      - {user.name} (ID: {user.id})")

        print("\n2️⃣  Listando todas as músicas (REST)...")
        musics = await client.rest_list_all_musics()
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

        print("\n3️⃣  Listando playlists do usuário 1 (REST)...")
        playlists = await client.rest_list_user_playlists(1)
        print(f"   ✅ {len(playlists)} playlists encontradas")
        for playlist in playlists[:3]:
            print(f"      - {playlist.name} (ID: {playlist.id})")

    except Exception as error:
        print(f"   ❌ Erro: {error}")


async def example_graphql():
    """Exemplo: Usando GraphQL"""
    print("\n" + "=" * 80)
    print("🔷 EXEMPLO 2: GraphQL")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        print("\n1️⃣  Listando todos os usuários (GraphQL)...")
        users = await client.graphql_list_all_users()
        print(f"   ✅ {len(users)} usuários encontrados")
        for user in users[:3]:
            print(f"      - {user.name} (ID: {user.id})")

        print("\n2️⃣  Listando todas as músicas (GraphQL)...")
        musics = await client.graphql_list_all_musics()
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

        print("\n3️⃣  Listando músicas da playlist 1 (GraphQL)...")
        musics = await client.graphql_list_playlist_musics(1)
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

    except Exception as error:
        print(f"   ❌ Erro: {error}")


async def example_soap():
    """Exemplo: Usando SOAP"""
    print("\n" + "=" * 80)
    print("📮 EXEMPLO 3: SOAP")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        print("\n1️⃣  Listando todos os usuários (SOAP)...")
        users = await client.soap_list_all_users()
        print(f"   ✅ {len(users)} usuários encontrados")
        for user in users[:3]:
            print(f"      - {user.name} (ID: {user.id})")

        print("\n2️⃣  Listando todas as músicas (SOAP)...")
        musics = await client.soap_list_all_musics()
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

        print("\n3️⃣  Listando playlists com a música 1 (SOAP)...")
        playlists = await client.soap_list_playlists_by_music(1)
        print(f"   ✅ {len(playlists)} playlists encontradas")
        for playlist in playlists[:3]:
            print(f"      - {playlist.name} (ID: {playlist.id})")

    except Exception as error:
        print(f"   ❌ Erro: {error}")


async def example_grpc():
    """Exemplo: Usando gRPC"""
    print("\n" + "=" * 80)
    print("⚡ EXEMPLO 4: gRPC")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        print("\n1️⃣  Listando todos os usuários (gRPC)...")
        users = await client.grpc_list_all_users()
        print(f"   ✅ {len(users)} usuários encontrados")
        for user in users[:3]:
            print(f"      - {user.name} (ID: {user.id})")

        print("\n2️⃣  Listando todas as músicas (gRPC)...")
        musics = await client.grpc_list_all_musics()
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

        print("\n3️⃣  Listando músicas da playlist 1 (gRPC)...")
        musics = await client.grpc_list_playlist_musics(1)
        print(f"   ✅ {len(musics)} músicas encontradas")
        for music in musics[:3]:
            print(f"      - {music.name} por {music.artist} (ID: {music.id})")

    except Exception as error:
        print(f"   ❌ Erro: {error}")


async def example_health_check():
    """Exemplo: Verificar saúde dos endpoints"""
    print("\n" + "=" * 80)
    print("🏥 EXEMPLO 5: Health Check")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        print("\nVerificando saúde de todos os endpoints...")
        result = await client.health_check()

        print(f"\n✅ Todos os endpoints responderam com sucesso!")
        print(f"   - REST: OK")
        print(f"   - GraphQL: OK")
        print(f"   - SOAP: OK")
        print(f"   - gRPC: OK")

    except Exception as error:
        print(f"\n❌ Erro ao verificar saúde dos endpoints: {error}")


async def example_complete_workflow():
    """Exemplo: Fluxo completo usando diferentes tecnologias"""
    print("\n" + "=" * 80)
    print("🎯 EXEMPLO 6: Fluxo Completo")
    print("=" * 80)

    client = MusicStreamingClient()

    try:
        # 1. Usar REST para listar usuários
        print("\n1️⃣  Buscando usuários com REST...")
        users = await client.rest_list_all_users()
        print(f"   ✅ {len(users)} usuários encontrados")
        first_user_id = users[0].id if users else 1

        # 2. Usar GraphQL para listar playlists do usuário
        print(f"\n2️⃣  Buscando playlists do usuário {first_user_id} com GraphQL...")
        playlists = await client.graphql_list_user_playlists(first_user_id)
        print(f"   ✅ {len(playlists)} playlists encontradas")
        first_playlist_id = playlists[0].id if playlists else 1

        # 3. Usar SOAP para listar músicas da playlist
        print(f"\n3️⃣  Buscando músicas da playlist {first_playlist_id} com SOAP...")
        musics = await client.soap_list_playlist_musics(first_playlist_id)
        print(f"   ✅ {len(musics)} músicas encontradas")

        # 4. Usar gRPC para listar playlists que contêm uma música
        first_music_id = musics[0].id if musics else 1
        print(f"\n4️⃣  Buscando playlists que contêm a música {first_music_id} com gRPC...")
        playlists_with_music = await client.grpc_list_playlists_by_music(first_music_id)
        print(f"   ✅ {len(playlists_with_music)} playlists encontradas")

        print("\n✅ Fluxo completo executado com sucesso!")

    except Exception as error:
        print(f"\n❌ Erro durante fluxo: {error}")


async def main():
    """Executar todos os exemplos"""
    print("\n" + "=" * 80)
    print("🎵 EXEMPLOS DE USO - CLIENTE DE MÚSICA STREAMING")
    print("=" * 80)

    # Executar exemplos
    await example_rest()
    await example_graphql()
    await example_soap()
    await example_grpc()
    await example_health_check()
    await example_complete_workflow()

    print("\n" + "=" * 80)
    print("✅ Todos os exemplos foram executados!")
    print("=" * 80 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
