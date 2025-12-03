from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Empty(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

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

class MusicById(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: int
    def __init__(self, id: _Optional[int] = ...) -> None: ...

class CreateMusicRequest(_message.Message):
    __slots__ = ("name", "artist")
    NAME_FIELD_NUMBER: _ClassVar[int]
    ARTIST_FIELD_NUMBER: _ClassVar[int]
    name: str
    artist: str
    def __init__(self, name: _Optional[str] = ..., artist: _Optional[str] = ...) -> None: ...

class UpdateMusicRequest(_message.Message):
    __slots__ = ("id", "name", "artist")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    ARTIST_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    artist: str
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ..., artist: _Optional[str] = ...) -> None: ...

class DeleteResponse(_message.Message):
    __slots__ = ("success", "message")
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    success: bool
    message: str
    def __init__(self, success: bool = ..., message: _Optional[str] = ...) -> None: ...
