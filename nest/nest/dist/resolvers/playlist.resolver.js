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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const playlist_entity_1 = require("../entities/playlist.entity");
const music_entity_1 = require("../entities/music.entity");
const user_entity_1 = require("../entities/user.entity");
const supabase_service_1 = require("../supabase/supabase.service");
const create_playlist_input_1 = require("../inputs/create-playlist.input");
const update_playlist_input_1 = require("../inputs/update-playlist.input");
const add_music_to_playlist_input_1 = require("../inputs/add-music-to-playlist.input");
let PlaylistResolver = class PlaylistResolver {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.playlist.select('*');
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.playlist
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findPlaylistsByMusic(musicId) {
        const { data: playlistMusicData, error: playlistMusicError } = await this.supabaseService.playlistMusic
            .select('playlistId')
            .eq('musicId', musicId);
        if (playlistMusicError || !playlistMusicData?.length) {
            return [];
        }
        const playlistIds = playlistMusicData.map((pm) => pm.playlistId);
        const { data, error } = await this.supabaseService.playlist
            .select('*')
            .in('id', playlistIds);
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async createPlaylist(input) {
        const { data, error } = await this.supabaseService.playlist
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async updatePlaylist(input) {
        const { id, ...updateData } = input;
        const { data, error } = await this.supabaseService.playlist
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async removePlaylist(id) {
        const { error } = await this.supabaseService.playlist.delete().eq('id', id);
        if (error)
            throw new Error(error.message);
        return true;
    }
    async addMusicToPlaylist(input) {
        const { data, error } = await this.supabaseService.playlistMusic
            .insert({
            playlistId: input.playlistId,
            musicId: input.musicId,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return !!data;
    }
    async removeMusicFromPlaylist(playlistId, musicId) {
        const { error } = await this.supabaseService.playlistMusic
            .delete()
            .eq('playlistId', playlistId)
            .eq('musicId', musicId);
        if (error)
            throw new Error(error.message);
        return true;
    }
    async musics(playlist) {
        const { data: playlistMusicData, error: playlistMusicError } = await this.supabaseService.playlistMusic
            .select('musicId')
            .eq('playlistId', playlist.id);
        if (playlistMusicError || !playlistMusicData?.length) {
            return [];
        }
        const musicIds = playlistMusicData.map((pm) => pm.musicId);
        const { data, error } = await this.supabaseService.music
            .select('*')
            .in('id', musicIds);
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async users(playlist) {
        const { data: userPlaylistData, error: userPlaylistError } = await this.supabaseService.userPlaylist
            .select('userId')
            .eq('playlistId', playlist.id);
        if (userPlaylistError || !userPlaylistData?.length) {
            return [];
        }
        const userIds = userPlaylistData.map((up) => up.userId);
        const { data, error } = await this.supabaseService.user
            .select('*')
            .in('id', userIds);
        if (error)
            throw new Error(error.message);
        return data || [];
    }
};
exports.PlaylistResolver = PlaylistResolver;
__decorate([
    (0, graphql_1.Query)(() => [playlist_entity_1.Playlist], { name: 'playlists' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => playlist_entity_1.Playlist, { name: 'playlist', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [playlist_entity_1.Playlist], { name: 'playlistsByMusic' }),
    __param(0, (0, graphql_1.Args)('musicId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "findPlaylistsByMusic", null);
__decorate([
    (0, graphql_1.Mutation)(() => playlist_entity_1.Playlist),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playlist_input_1.CreatePlaylistInput]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "createPlaylist", null);
__decorate([
    (0, graphql_1.Mutation)(() => playlist_entity_1.Playlist),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_playlist_input_1.UpdatePlaylistInput]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "updatePlaylist", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "removePlaylist", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_music_to_playlist_input_1.AddMusicToPlaylistInput]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "addMusicToPlaylist", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('playlistId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('musicId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "removeMusicFromPlaylist", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [music_entity_1.Music], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [playlist_entity_1.Playlist]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "musics", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_entity_1.User], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [playlist_entity_1.Playlist]),
    __metadata("design:returntype", Promise)
], PlaylistResolver.prototype, "users", null);
exports.PlaylistResolver = PlaylistResolver = __decorate([
    (0, graphql_1.Resolver)(() => playlist_entity_1.Playlist),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PlaylistResolver);
//# sourceMappingURL=playlist.resolver.js.map