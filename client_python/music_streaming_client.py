"""
Cliente unificado para o serviço de streaming de músicas
Suporta: REST, GraphQL, SOAP e gRPC
"""

import requests
import json
from typing import List, Dict, Optional, Any
from dataclasses import dataclass
import asyncio
from zeep import Client as SoapClient
import sys
import os

try:
    import grpc
    import grpc.aio
except ImportError:
    grpc = None

# Importar proto files (se necessário compilar primeiro)
# python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto


@dataclass
class ClientConfig:
    """Configuração do cliente"""
    rest_base_url: str = "http://localhost:3000"
    rest_timeout: int = 5000
    graphql_url: str = "http://localhost:3000/graphql"
    graphql_timeout: int = 5000
    soap_url: str = "http://localhost:8080/soap"
    soap_user_wsdl_url: str = "http://localhost:8080/user/wsdl"
    soap_music_wsdl_url: str = "http://localhost:8080/music/wsdl"
    soap_playlist_wsdl_url: str = "http://localhost:8080/playlist/wsdl"
    soap_timeout: int = 5000
    grpc_url: str = "localhost:4000"
    grpc_timeout: int = 5000


@dataclass
class User:
    """Usuário"""
    id: int
    name: str
    age: int


@dataclass
class Music:
    """Música"""
    id: int
    name: str
    artist: str


@dataclass
class Playlist:
    """Playlist"""
    id: int
    name: str


class MusicStreamingClient:
    """Cliente unificado para música streaming"""

    def __init__(self, config: Optional[ClientConfig] = None):
        """Inicializar cliente com configuração opcional"""
        self.config = config or ClientConfig()
        self.soap_user_client = None
        self.soap_music_client = None
        self.soap_playlist_client = None
        self.grpc_clients = {}
        self.rest_session = requests.Session()
        self.rest_session.timeout = self.config.rest_timeout / 1000

    # ==================== GraphQL ====================

    def _graphql_query(self, query: str, variables: Optional[Dict] = None) -> Dict[str, Any]:
        """Fazer query GraphQL"""
        try:
            payload = {
                "query": query,
                "variables": variables or {}
            }
            
            response = requests.post(
                self.config.graphql_url,
                json=payload,
                timeout=self.config.graphql_timeout / 1000,
                headers={"Content-Type": "application/json"}
            )
            
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data:
                raise Exception(f"GraphQL error: {data['errors'][0]['message']}")
            
            return data.get("data", {})
        except Exception as error:
            print(f"Erro ao fazer query GraphQL: {error}")
            raise

    # ==================== REST API ====================

    async def rest_list_all_users(self) -> List[User]:
        """REST: Listar todos os usuários"""
        try:
            response = self.rest_session.get(
                f"{self.config.rest_base_url}/user"
            )
            response.raise_for_status()
            data = response.json()
            return [User(**u) for u in data] if isinstance(data, list) else []
        except Exception as error:
            print(f"Erro ao listar usuários (REST): {error}")
            raise

    async def rest_list_all_musics(self) -> List[Music]:
        """REST: Listar todas as músicas"""
        try:
            response = self.rest_session.get(
                f"{self.config.rest_base_url}/music"
            )
            response.raise_for_status()
            data = response.json()
            return [Music(**m) for m in data] if isinstance(data, list) else []
        except Exception as error:
            print(f"Erro ao listar músicas (REST): {error}")
            raise

    async def rest_list_user_playlists(self, user_id: int) -> List[Playlist]:
        """REST: Listar playlists de um usuário"""
        try:
            response = self.rest_session.get(
                f"{self.config.rest_base_url}/user/{user_id}/playlists"
            )
            response.raise_for_status()
            data = response.json()
            return [Playlist(**p) for p in data] if isinstance(data, list) else []
        except Exception as error:
            print(f"Erro ao listar playlists do usuário {user_id} (REST): {error}")
            raise

    async def rest_list_playlist_musics(self, playlist_id: int) -> List[Music]:
        """REST: Listar músicas de uma playlist"""
        try:
            response = self.rest_session.get(
                f"{self.config.rest_base_url}/playlist/{playlist_id}/musics"
            )
            response.raise_for_status()
            data = response.json()
            return [Music(**m) for m in data] if isinstance(data, list) else []
        except Exception as error:
            print(f"Erro ao listar músicas da playlist {playlist_id} (REST): {error}")
            raise

    async def rest_list_playlists_by_music(self, music_id: int) -> List[Playlist]:
        """REST: Listar playlists que contêm uma música"""
        try:
            response = self.rest_session.get(
                f"{self.config.rest_base_url}/music/{music_id}/playlists"
            )
            response.raise_for_status()
            data = response.json()
            return [Playlist(**p) for p in data] if isinstance(data, list) else []
        except Exception as error:
            print(f"Erro ao listar playlists com música {music_id} (REST): {error}")
            raise

    # ==================== GraphQL ====================

    async def graphql_list_all_users(self) -> List[User]:
        """GraphQL: Listar todos os usuários"""
        try:
            query = """
            query {
                users {
                    id
                    name
                    age
                }
            }
            """
            data = self._graphql_query(query)
            users = data.get("users", [])
            return [User(**u) for u in users]
        except Exception as error:
            print(f"Erro ao listar usuários (GraphQL): {error}")
            raise

    async def graphql_list_all_musics(self) -> List[Music]:
        """GraphQL: Listar todas as músicas"""
        try:
            query = """
            query {
                musics {
                    id
                    name
                    artist
                }
            }
            """
            data = self._graphql_query(query)
            musics = data.get("musics", [])
            return [Music(**m) for m in musics]
        except Exception as error:
            print(f"Erro ao listar músicas (GraphQL): {error}")
            raise

    async def graphql_list_user_playlists(self, user_id: int) -> List[Playlist]:
        """GraphQL: Listar playlists de um usuário"""
        try:
            query = """
            query GetUserPlaylists($userId: Int!) {
                user(id: $userId) {
                    id
                    name
                    playlists {
                        id
                        name
                    }
                }
            }
            """
            data = self._graphql_query(query, {"userId": user_id})
            user = data.get("user", {})
            playlists = user.get("playlists", [])
            return [Playlist(**p) for p in playlists]
        except Exception as error:
            print(f"Erro ao listar playlists do usuário {user_id} (GraphQL): {error}")
            raise

    async def graphql_list_playlist_musics(self, playlist_id: int) -> List[Music]:
        """GraphQL: Listar músicas de uma playlist"""
        try:
            query = """
            query GetPlaylistMusics($playlistId: Int!) {
                playlist(id: $playlistId) {
                    id
                    name
                    musics {
                        id
                        name
                        artist
                    }
                }
            }
            """
            data = self._graphql_query(query, {"playlistId": playlist_id})
            playlist = data.get("playlist", {})
            musics = playlist.get("musics", [])
            return [Music(**m) for m in musics]
        except Exception as error:
            print(f"Erro ao listar músicas da playlist {playlist_id} (GraphQL): {error}")
            raise

    async def graphql_list_playlists_by_music(self, music_id: int) -> List[Playlist]:
        """GraphQL: Listar playlists que contêm uma música"""
        try:
            query = """
            query GetMusicPlaylists($musicId: Int!) {
                music(id: $musicId) {
                    id
                    name
                    artist
                    playlists {
                        id
                        name
                    }
                }
            }
            """
            data = self._graphql_query(query, {"musicId": music_id})
            music = data.get("music", {})
            playlists = music.get("playlists", [])
            return [Playlist(**p) for p in playlists]
        except Exception as error:
            print(f"Erro ao listar playlists com música {music_id} (GraphQL): {error}")
            raise

    # ==================== SOAP ====================

    async def _initialize_soap_user_client(self) -> None:
        """Inicializar cliente SOAP de usuários"""
        if self.soap_user_client:
            return
        try:
            self.soap_user_client = SoapClient(wsdl=self.config.soap_user_wsdl_url)
        except Exception as error:
            print(f"Erro ao inicializar cliente SOAP de usuários: {error}")
            raise

    async def _initialize_soap_music_client(self) -> None:
        """Inicializar cliente SOAP de músicas"""
        if self.soap_music_client:
            return
        try:
            self.soap_music_client = SoapClient(wsdl=self.config.soap_music_wsdl_url)
        except Exception as error:
            print(f"Erro ao inicializar cliente SOAP de músicas: {error}")
            raise

    async def _initialize_soap_playlist_client(self) -> None:
        """Inicializar cliente SOAP de playlists"""
        if self.soap_playlist_client:
            return
        try:
            self.soap_playlist_client = SoapClient(wsdl=self.config.soap_playlist_wsdl_url)
        except Exception as error:
            print(f"Erro ao inicializar cliente SOAP de playlists: {error}")
            raise

    def _parse_soap_response(self, response: Any) -> List[Dict]:
        """Parse de resposta SOAP para lista de dicionários"""
        if isinstance(response, dict):
            # Tentar encontrar a chave com dados
            for key, value in response.items():
                if isinstance(value, list):
                    return value
                if isinstance(value, dict):
                    return [value]
            return []
        elif isinstance(response, list):
            return response
        return []

    async def soap_list_all_users(self) -> List[User]:
        """SOAP: Listar todos os usuários"""
        try:
            if not self.soap_user_client:
                await self._initialize_soap_user_client()
            
            result = self.soap_user_client.service.FindAll()
            users_data = self._parse_soap_response(result)
            
            users = []
            for u in users_data:
                if isinstance(u, dict):
                    try:
                        users.append(User(
                            id=int(u.get('id', 0)),
                            name=str(u.get('name', '')),
                            age=int(u.get('age', 0))
                        ))
                    except (ValueError, TypeError):
                        continue
            
            return users
        except Exception as error:
            print(f"Erro ao listar usuários (SOAP): {error}")
            raise

    async def soap_list_all_musics(self) -> List[Music]:
        """SOAP: Listar todas as músicas"""
        try:
            if not self.soap_music_client:
                await self._initialize_soap_music_client()
            
            result = self.soap_music_client.service.FindAll()
            musics_data = self._parse_soap_response(result)
            
            musics = []
            for m in musics_data:
                if isinstance(m, dict):
                    try:
                        musics.append(Music(
                            id=int(m.get('id', 0)),
                            name=str(m.get('name', '')),
                            artist=str(m.get('artist', ''))
                        ))
                    except (ValueError, TypeError):
                        continue
            
            return musics
        except Exception as error:
            print(f"Erro ao listar músicas (SOAP): {error}")
            raise

    async def soap_list_playlists_by_user(self, user_id: int) -> List[Playlist]:
        """SOAP: Listar playlists de um usuário"""
        try:
            if not self.soap_user_client:
                await self._initialize_soap_user_client()
            
            result = self.soap_user_client.service.FindPlaylists(user_id)
            playlists_data = self._parse_soap_response(result)
            
            playlists = []
            for p in playlists_data:
                if isinstance(p, dict):
                    try:
                        playlists.append(Playlist(
                            id=int(p.get('id', 0)),
                            name=str(p.get('name', ''))
                        ))
                    except (ValueError, TypeError):
                        continue
            
            return playlists
        except Exception as error:
            print(f"Erro ao listar playlists do usuário {user_id} (SOAP): {error}")
            raise

    async def soap_list_musics_by_playlist(self, playlist_id: int) -> List[Music]:
        """SOAP: Listar músicas de uma playlist"""
        try:
            if not self.soap_playlist_client:
                await self._initialize_soap_playlist_client()
            
            result = self.soap_playlist_client.service.FindMusics(playlist_id)
            musics_data = self._parse_soap_response(result)
            
            musics = []
            for m in musics_data:
                if isinstance(m, dict):
                    try:
                        musics.append(Music(
                            id=int(m.get('id', 0)),
                            name=str(m.get('name', '')),
                            artist=str(m.get('artist', ''))
                        ))
                    except (ValueError, TypeError):
                        continue
            
            return musics
        except Exception as error:
            print(f"Erro ao listar músicas da playlist {playlist_id} (SOAP): {error}")
            raise

    async def soap_list_playlists_by_music(self, music_id: int) -> List[Playlist]:
        """SOAP: Listar playlists que contêm uma música"""
        try:
            if not self.soap_music_client:
                await self._initialize_soap_music_client()
            
            result = self.soap_music_client.service.FindPlaylists(musicId=music_id)
            playlists_data = self._parse_soap_response(result)
            
            playlists = []
            for p in playlists_data:
                if isinstance(p, dict):
                    try:
                        playlists.append(Playlist(
                            id=int(p.get('id', 0)),
                            name=str(p.get('name', ''))
                        ))
                    except (ValueError, TypeError):
                        continue
            
            return playlists
        except Exception as error:
            print(f"Erro ao listar playlists com música {music_id} (SOAP): {error}")
            raise

    # ==================== gRPC ====================

    async def _initialize_grpc_clients(self) -> None:
        """Inicializar clientes gRPC"""
        if self.grpc_clients:
            return

        if not grpc:
            raise RuntimeError("grpcio não instalado. Execute: pip install grpcio grpcio-tools")

        try:
            # Tentar importar os proto files compilados
            try:
                import user_pb2, user_pb2_grpc
                import music_pb2, music_pb2_grpc
                import playlist_pb2, playlist_pb2_grpc
                
                # Criar canal assíncrono
                channel = grpc.aio.insecure_channel(self.config.grpc_url)
                
                # Criar stubs
                self.grpc_clients['user'] = user_pb2_grpc.UserServiceStub(channel)
                self.grpc_clients['music'] = music_pb2_grpc.MusicServiceStub(channel)
                self.grpc_clients['playlist'] = playlist_pb2_grpc.PlaylistServiceStub(channel)
                self.grpc_clients['channel'] = channel
                
            except ImportError as e:
                print(f"Proto files não encontrados. Compile com: python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto")
                raise
                
        except Exception as error:
            print(f"Erro ao inicializar clientes gRPC: {error}")
            raise

    async def grpc_list_all_users(self) -> List[User]:
        """gRPC: Listar todos os usuários"""
        try:
            if not self.grpc_clients.get('user'):
                await self._initialize_grpc_clients()
            
            # Importar Empty do protobuf
            from google.protobuf.empty_pb2 import Empty
            import user_pb2
            
            stub = self.grpc_clients['user']
            response = await stub.FindAll(Empty())
            
            users = []
            for user in response.users:
                users.append(User(
                    id=user.id,
                    name=user.name,
                    age=user.age
                ))
            
            return users
        except Exception as error:
            print(f"Erro ao listar usuários (gRPC): {error}")
            # Retornar lista vazia em caso de erro
            return []

    async def grpc_list_all_musics(self) -> List[Music]:
        """gRPC: Listar todas as músicas"""
        try:
            if not self.grpc_clients.get('music'):
                await self._initialize_grpc_clients()
            
            from google.protobuf.empty_pb2 import Empty
            import music_pb2
            
            stub = self.grpc_clients['music']
            response = await stub.FindAll(Empty())
            
            musics = []
            for music in response.musics:
                musics.append(Music(
                    id=music.id,
                    name=music.name,
                    artist=music.artist
                ))
            
            return musics
        except Exception as error:
            print(f"Erro ao listar músicas (gRPC): {error}")
            return []

    async def grpc_list_user_playlists(self, user_id: int) -> List[Playlist]:
        """gRPC: Listar playlists de um usuário"""
        try:
            if not self.grpc_clients.get('user'):
                await self._initialize_grpc_clients()
            
            import user_pb2
            
            stub = self.grpc_clients['user']
            request = user_pb2.UserById(id=user_id)
            response = await stub.FindPlaylists(request)
            
            playlists = []
            for playlist in response.playlists:
                playlists.append(Playlist(
                    id=playlist.id,
                    name=playlist.name
                ))
            
            return playlists
        except Exception as error:
            print(f"Erro ao listar playlists do usuário {user_id} (gRPC): {error}")
            return []

    async def grpc_list_playlist_musics(self, playlist_id: int) -> List[Music]:
        """gRPC: Listar músicas de uma playlist"""
        try:
            if not self.grpc_clients.get('playlist'):
                await self._initialize_grpc_clients()
            
            import playlist_pb2
            
            stub = self.grpc_clients['playlist']
            request = playlist_pb2.PlaylistById(id=playlist_id)
            response = await stub.FindMusics(request)
            
            musics = []
            for music in response.musics:
                musics.append(Music(
                    id=music.id,
                    name=music.name,
                    artist=music.artist
                ))
            
            return musics
        except Exception as error:
            print(f"Erro ao listar músicas da playlist {playlist_id} (gRPC): {error}")
            return []

    async def grpc_list_playlists_by_music(self, music_id: int) -> List[Playlist]:
        """gRPC: Listar playlists que contêm uma música"""
        try:
            # Método não implementado no serviço gRPC de música
            # Retornar lista vazia por enquanto
            print(f"Método grpc_list_playlists_by_music não implementado no servidor gRPC")
            return []
        except Exception as error:
            print(f"Erro ao listar playlists com música {music_id} (gRPC): {error}")
            return []

    # ==================== UTILITÁRIOS ====================

    async def health_check(self) -> Dict[str, bool]:
        """Verificar saúde de cada tecnologia"""
        results = {
            "rest": False,
            "graphql": False,
            "soap": False,
            "grpc": False
        }

        # Verificar REST
        try:
            await self.rest_list_all_users()
            results["rest"] = True
        except:
            results["rest"] = False

        # Verificar GraphQL
        try:
            await self.graphql_list_all_users()
            results["graphql"] = True
        except:
            results["graphql"] = False

        # Verificar SOAP
        try:
            await self.soap_list_all_users()
            results["soap"] = True
        except:
            results["soap"] = False

        # Verificar gRPC
        try:
            await self.grpc_list_all_users()
            results["grpc"] = True
        except:
            results["grpc"] = False

        return results


def create_music_client(config: Optional[ClientConfig] = None) -> MusicStreamingClient:
    """Criar nova instância do cliente"""
    return MusicStreamingClient(config)
