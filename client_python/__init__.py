"""
Client Python - Cliente unificado para Music Streaming API
Suporta: REST, GraphQL, SOAP, gRPC

Exemplo de uso:
    from music_streaming_client import MusicStreamingClient, ClientConfig
    
    async def main():
        client = MusicStreamingClient()
        users = await client.rest_list_all_users()
        print(users)
"""

from music_streaming_client import (
    MusicStreamingClient,
    ClientConfig,
    User,
    Music,
    Playlist,
    create_music_client
)

__version__ = "1.0.0"
__author__ = "Music Manager Team"
__all__ = [
    "MusicStreamingClient",
    "ClientConfig",
    "User",
    "Music",
    "Playlist",
    "create_music_client",
]
