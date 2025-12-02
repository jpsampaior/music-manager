"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const graphql_1 = require("@nestjs/graphql");
const playlist_entity_1 = require("./playlist.entity");
let Music = class Music {
    id;
    name;
    artist;
    playlists;
};
exports.Music = Music;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Music.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Music.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Music.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(() => [playlist_entity_1.Playlist], { nullable: true }),
    __metadata("design:type", Array)
], Music.prototype, "playlists", void 0);
exports.Music = Music = __decorate([
    (0, graphql_1.ObjectType)()
], Music);
//# sourceMappingURL=music.entity.js.map