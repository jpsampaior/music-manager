"""
Executa somente os testes SOAP isolados (100 requisições por operação)
"""
import asyncio
import time
from load_test import LoadTester

async def run_soap_only(requests_per_operation: int = 100):
    tester = LoadTester()

    operations = [
        ("Listar Usuários", lambda: tester.client.soap_list_all_users()),
        ("Listar Músicas", lambda: tester.client.soap_list_all_musics()),
        ("Playlists do Usuário (ID=1)", lambda: tester.client.soap_list_user_playlists(1)),
        ("Músicas da Playlist (ID=1)", lambda: tester.client.soap_list_playlist_musics(1)),
        ("Playlists com Música (ID=1)", lambda: tester.client.soap_list_playlists_by_music(1)),
    ]

    print("\n" + "="*80)
    print("🚀 TESTE SOAP ISOLADO")
    print("="*80)

    for op_name, func in operations:
        await tester._run_load_test("SOAP", op_name, func, requests_per_operation)

    print("\n✅ Teste SOAP isolado concluído. Resumo:")
    tester._print_summary()

if __name__ == "__main__":
    asyncio.run(run_soap_only())
