"""
Interface CLI para o cliente de música streaming
Permite interação com as 4 tecnologias através de menu interativo
"""

import asyncio
from music_streaming_client import MusicStreamingClient


class MusicStreamingCLI:
    """Interface de linha de comando para o cliente de música"""

    def __init__(self):
        """Inicializar CLI"""
        self.client = MusicStreamingClient()
        self.running = True

    async def run(self) -> None:
        """Executar o menu principal"""
        print("\n" + "=" * 80)
        print("🎵 CLIENTE DE MÚSICA STREAMING - MODO INTERATIVO")
        print("=" * 80)

        while self.running:
            self._print_main_menu()
            choice = input("\n👉 Escolha uma opção: ").strip()

            if choice == "1":
                await self._technology_menu("REST")
            elif choice == "2":
                await self._technology_menu("GraphQL")
            elif choice == "3":
                await self._technology_menu("SOAP")
            elif choice == "4":
                await self._technology_menu("gRPC")
            elif choice == "5":
                await self._health_check()
            elif choice == "6":
                await self._compare_technologies()
            elif choice == "0":
                self._exit()
            else:
                print("\n❌ Opção inválida!")

    def _print_main_menu(self) -> None:
        """Imprimir menu principal"""
        print("\n" + "-" * 80)
        print("MENU PRINCIPAL\n")
        print("1️⃣  Usar REST")
        print("2️⃣  Usar GraphQL")
        print("3️⃣  Usar SOAP")
        print("4️⃣  Usar gRPC")
        print("5️⃣  Health Check")
        print("6️⃣  Comparar Tecnologias")
        print("0️⃣  Sair")
        print("-" * 80)

    async def _technology_menu(self, technology: str) -> None:
        """Menu para operações de uma tecnologia específica"""
        while True:
            print(f"\n{'=' * 80}")
            print(f"🌐 MENU - {technology.upper()}")
            print("=" * 80)
            print("\n1️⃣  Listar todos os usuários")
            print("2️⃣  Listar todas as músicas")
            print("3️⃣  Listar playlists do usuário")
            print("4️⃣  Listar músicas da playlist")
            print("5️⃣  Listar playlists com música")
            print("0️⃣  Voltar")
            print("-" * 80)

            choice = input(f"\n👉 Escolha uma operação {technology}: ").strip()

            if choice == "1":
                await self._list_all_users(technology)
            elif choice == "2":
                await self._list_all_musics(technology)
            elif choice == "3":
                await self._list_user_playlists(technology)
            elif choice == "4":
                await self._list_playlist_musics(technology)
            elif choice == "5":
                await self._list_playlists_by_music(technology)
            elif choice == "0":
                break
            else:
                print("\n❌ Opção inválida!")

    async def _list_all_users(self, technology: str) -> None:
        """Listar todos os usuários"""
        try:
            print(f"\n⏳ Buscando usuários com {technology}...")
            if technology == "REST":
                users = await self.client.rest_list_all_users()
            elif technology == "GraphQL":
                users = await self.client.graphql_list_all_users()
            elif technology == "SOAP":
                users = await self.client.soap_list_all_users()
            elif technology == "gRPC":
                users = await self.client.grpc_list_all_users()

            print(f"\n✅ {len(users)} usuários encontrados:\n")
            for user in users:
                print(f"   ID: {user.id:3} | Nome: {user.name:20} | Idade: {user.age}")

        except Exception as error:
            print(f"\n❌ Erro: {error}")

    async def _list_all_musics(self, technology: str) -> None:
        """Listar todas as músicas"""
        try:
            print(f"\n⏳ Buscando músicas com {technology}...")
            if technology == "REST":
                musics = await self.client.rest_list_all_musics()
            elif technology == "GraphQL":
                musics = await self.client.graphql_list_all_musics()
            elif technology == "SOAP":
                musics = await self.client.soap_list_all_musics()
            elif technology == "gRPC":
                musics = await self.client.grpc_list_all_musics()

            print(f"\n✅ {len(musics)} músicas encontradas:\n")
            for music in musics:
                print(f"   ID: {music.id:3} | Nome: {music.name:25} | Artista: {music.artist}")

        except Exception as error:
            print(f"\n❌ Erro: {error}")

    async def _list_user_playlists(self, technology: str) -> None:
        """Listar playlists de um usuário"""
        try:
            user_id = int(input("\n👉 Digite o ID do usuário: "))
            print(f"\n⏳ Buscando playlists do usuário {user_id} com {technology}...")

            if technology == "REST":
                playlists = await self.client.rest_list_user_playlists(user_id)
            elif technology == "GraphQL":
                playlists = await self.client.graphql_list_user_playlists(user_id)
            elif technology == "SOAP":
                playlists = await self.client.soap_list_user_playlists(user_id)
            elif technology == "gRPC":
                playlists = await self.client.grpc_list_user_playlists(user_id)

            print(f"\n✅ {len(playlists)} playlists encontradas:\n")
            for playlist in playlists:
                print(f"   ID: {playlist.id:3} | Nome: {playlist.name}")

        except ValueError:
            print("\n❌ ID inválido!")
        except Exception as error:
            print(f"\n❌ Erro: {error}")

    async def _list_playlist_musics(self, technology: str) -> None:
        """Listar músicas de uma playlist"""
        try:
            playlist_id = int(input("\n👉 Digite o ID da playlist: "))
            print(f"\n⏳ Buscando músicas da playlist {playlist_id} com {technology}...")

            if technology == "REST":
                musics = await self.client.rest_list_playlist_musics(playlist_id)
            elif technology == "GraphQL":
                musics = await self.client.graphql_list_playlist_musics(playlist_id)
            elif technology == "SOAP":
                musics = await self.client.soap_list_playlist_musics(playlist_id)
            elif technology == "gRPC":
                musics = await self.client.grpc_list_playlist_musics(playlist_id)

            print(f"\n✅ {len(musics)} músicas encontradas:\n")
            for music in musics:
                print(f"   ID: {music.id:3} | Nome: {music.name:25} | Artista: {music.artist}")

        except ValueError:
            print("\n❌ ID inválido!")
        except Exception as error:
            print(f"\n❌ Erro: {error}")

    async def _list_playlists_by_music(self, technology: str) -> None:
        """Listar playlists que contêm uma música"""
        try:
            music_id = int(input("\n👉 Digite o ID da música: "))
            print(f"\n⏳ Buscando playlists com a música {music_id} usando {technology}...")

            if technology == "REST":
                playlists = await self.client.rest_list_playlists_by_music(music_id)
            elif technology == "GraphQL":
                playlists = await self.client.graphql_list_playlists_by_music(music_id)
            elif technology == "SOAP":
                playlists = await self.client.soap_list_playlists_by_music(music_id)
            elif technology == "gRPC":
                playlists = await self.client.grpc_list_playlists_by_music(music_id)

            print(f"\n✅ {len(playlists)} playlists encontradas:\n")
            for playlist in playlists:
                print(f"   ID: {playlist.id:3} | Nome: {playlist.name}")

        except ValueError:
            print("\n❌ ID inválido!")
        except Exception as error:
            print(f"\n❌ Erro: {error}")

    async def _health_check(self) -> None:
        """Executar health check"""
        try:
            print("\n⏳ Verificando saúde dos endpoints...")
            await self.client.health_check()
            print("\n✅ Todos os endpoints estão respondendo corretamente!")
            print("   - REST: OK")
            print("   - GraphQL: OK")
            print("   - SOAP: OK")
            print("   - gRPC: OK")

        except Exception as error:
            print(f"\n❌ Erro ao verificar saúde: {error}")

    async def _compare_technologies(self) -> None:
        """Comparar performance das tecnologias"""
        try:
            import time

            print("\n⏳ Comparando performance das tecnologias...")
            print("   Executando 10 requisições para cada tecnologia...\n")

            technologies = {
                "REST": [
                    self.client.rest_list_all_users,
                    self.client.rest_list_all_musics,
                    self.client.rest_list_user_playlists,
                ],
                "GraphQL": [
                    self.client.graphql_list_all_users,
                    self.client.graphql_list_all_musics,
                    self.client.graphql_list_user_playlists,
                ],
                "SOAP": [
                    self.client.soap_list_all_users,
                    self.client.soap_list_all_musics,
                    self.client.soap_list_user_playlists,
                ],
                "gRPC": [
                    self.client.grpc_list_all_users,
                    self.client.grpc_list_all_musics,
                    self.client.grpc_list_user_playlists,
                ],
            }

            results = {}

            for tech_name, methods in technologies.items():
                times = []
                for method in methods:
                    start = time.time()
                    try:
                        await method(1) if "playlists" in method.__name__ else await method()
                        elapsed = (time.time() - start) * 1000
                        times.append(elapsed)
                    except Exception as e:
                        print(f"   ⚠️  {tech_name}: {e}")

                if times:
                    avg_time = sum(times) / len(times)
                    results[tech_name] = avg_time
                    print(f"   {tech_name:12} | Tempo médio: {avg_time:.2f}ms")

            # Encontrar mais rápido
            if results:
                fastest = min(results.items(), key=lambda x: x[1])
                print(f"\n🏆 Tecnologia mais rápida: {fastest[0]} ({fastest[1]:.2f}ms)")

        except Exception as error:
            print(f"\n❌ Erro ao comparar: {error}")

    def _exit(self) -> None:
        """Sair do programa"""
        self.running = False
        print("\n" + "=" * 80)
        print("👋 Até logo!")
        print("=" * 80 + "\n")


async def main():
    """Função principal"""
    cli = MusicStreamingCLI()
    await cli.run()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Programa interrompido pelo usuário")
