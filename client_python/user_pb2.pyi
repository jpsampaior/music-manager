from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Empty(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

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

class UserById(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: int
    def __init__(self, id: _Optional[int] = ...) -> None: ...

class CreateUserRequest(_message.Message):
    __slots__ = ("name", "age")
    NAME_FIELD_NUMBER: _ClassVar[int]
    AGE_FIELD_NUMBER: _ClassVar[int]
    name: str
    age: int
    def __init__(self, name: _Optional[str] = ..., age: _Optional[int] = ...) -> None: ...

class UpdateUserRequest(_message.Message):
    __slots__ = ("id", "name", "age")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    AGE_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    age: int
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ..., age: _Optional[int] = ...) -> None: ...

class DeleteResponse(_message.Message):
    __slots__ = ("success", "message")
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    success: bool
    message: str
    def __init__(self, success: bool = ..., message: _Optional[str] = ...) -> None: ...

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

class AddPlaylistToUserRequest(_message.Message):
    __slots__ = ("userId", "playlistId")
    USERID_FIELD_NUMBER: _ClassVar[int]
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    userId: int
    playlistId: int
    def __init__(self, userId: _Optional[int] = ..., playlistId: _Optional[int] = ...) -> None: ...

class AddPlaylistResponse(_message.Message):
    __slots__ = ("success", "data")
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    success: bool
    data: PlaylistToUserData
    def __init__(self, success: bool = ..., data: _Optional[_Union[PlaylistToUserData, _Mapping]] = ...) -> None: ...

class PlaylistToUserData(_message.Message):
    __slots__ = ("userId", "playlistId")
    USERID_FIELD_NUMBER: _ClassVar[int]
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    userId: int
    playlistId: int
    def __init__(self, userId: _Optional[int] = ..., playlistId: _Optional[int] = ...) -> None: ...

class RemovePlaylistFromUserRequest(_message.Message):
    __slots__ = ("userId", "playlistId")
    USERID_FIELD_NUMBER: _ClassVar[int]
    PLAYLISTID_FIELD_NUMBER: _ClassVar[int]
    userId: int
    playlistId: int
    def __init__(self, userId: _Optional[int] = ..., playlistId: _Optional[int] = ...) -> None: ...
