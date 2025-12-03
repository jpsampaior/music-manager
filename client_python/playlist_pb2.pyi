from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Empty(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class Playlist(_message.Message):
    __slots__ = ("id", "name")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ...) -> None: ...

class PlaylistList(_message.Message):
    __slots__ = ("playlists",)
    PLAYLISTS_FIELD_NUMBER: _ClassVar[int]
    playlists: _containers.RepeatedCompositeFieldContainer[Playlist]
    def __init__(self, playlists: _Optional[_Iterable[_Union[Playlist, _Mapping]]] = ...) -> None: ...

class PlaylistById(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: int
    def __init__(self, id: _Optional[int] = ...) -> None: ...

class CreatePlaylistRequest(_message.Message):
    __slots__ = ("name",)
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class UpdatePlaylistRequest(_message.Message):
    __slots__ = ("id", "name")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ...) -> None: ...

class DeleteResponse(_message.Message):
    __slots__ = ("success", "message")
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    success: bool
    message: str
    def __init__(self, success: bool = ..., message: _Optional[str] = ...) -> None: ...

class Music(_message.Message):
    __slots__ = ("id", "name", "artist")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    ARTIST_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    artist: str
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ..., artist: _Optional[str] = ...) -> None: ...

class MusicList(_message.Message):
    __slots__ = ("musics",)
    MUSICS_FIELD_NUMBER: _ClassVar[int]
    musics: _containers.RepeatedCompositeFieldContainer[Music]
    def __init__(self, musics: _Optional[_Iterable[_Union[Music, _Mapping]]] = ...) -> None: ...

class User(_message.Message):
    __slots__ = ("id", "name", "age")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    AGE_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    age: int
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ..., age: _Optional[int] = ...) -> None: ...

class UserList(_message.Message):
    __slots__ = ("users",)
    USERS_FIELD_NUMBER: _ClassVar[int]
    users: _containers.RepeatedCompositeFieldContainer[User]
    def __init__(self, users: _Optional[_Iterable[_Union[User, _Mapping]]] = ...) -> None: ...

class AddMusicToPlaylistRequest(_message.Message):
    __slots__ = ("playlistId", "musicId")
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    MUSICID_FIELD_NUMBER: _ClassVar[int]
    playlistId: int
    musicId: int
    def __init__(self, playlistId: _Optional[int] = ..., musicId: _Optional[int] = ...) -> None: ...

class AddMusicResponse(_message.Message):
    __slots__ = ("success", "data")
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    success: bool
    data: MusicToPlaylistData
    def __init__(self, success: bool = ..., data: _Optional[_Union[MusicToPlaylistData, _Mapping]] = ...) -> None: ...

class MusicToPlaylistData(_message.Message):
    __slots__ = ("playlistId", "musicId")
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    MUSICID_FIELD_NUMBER: _ClassVar[int]
    playlistId: int
    musicId: int
    def __init__(self, playlistId: _Optional[int] = ..., musicId: _Optional[int] = ...) -> None: ...

class RemoveMusicFromPlaylistRequest(_message.Message):
    __slots__ = ("playlistId", "musicId")
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    MUSICID_FIELD_NUMBER: _ClassVar[int]
    playlistId: int
    musicId: int
    def __init__(self, playlistId: _Optional[int] = ..., musicId: _Optional[int] = ...) -> None: ...
