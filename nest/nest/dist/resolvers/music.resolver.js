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
exports.MusicResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const music_entity_1 = require("../entities/music.entity");
const playlist_entity_1 = require("../entities/playlist.entity");
const supabase_service_1 = require("../supabase/supabase.service");
const create_music_input_1 = require("../inputs/create-music.input");
const update_music_input_1 = require("../inputs/update-music.input");
let MusicResolver = class MusicResolver {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.music.select('*');
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.music
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async createMusic(input) {
        const { data, error } = await this.supabaseService.music
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async updateMusic(input) {
        const { id, ...updateData } = input;
        const { data, error } = await this.supabaseService.music
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async removeMusic(id) {
        const { error } = await this.supabaseService.music.delete().eq('id', id);
        if (error)
            throw new Error(error.message);
        return true;
    }
    async playlists(music) {
        const { data: playlistMusicData, error: playlistMusicError } = await this.supabaseService.playlistMusic
            .select('playlistId')
            .eq('musicId', music.id);
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
};
exports.MusicResolver = MusicResolver;
__decorate([
    (0, graphql_1.Query)(() => [music_entity_1.Music], { name: 'musics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => music_entity_1.Music, { name: 'music', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => music_entity_1.Music),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_input_1.CreateMusicInput]),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "createMusic", null);
__decorate([
    (0, graphql_1.Mutation)(() => music_entity_1.Music),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_music_input_1.UpdateMusicInput]),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "updateMusic", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "removeMusic", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [playlist_entity_1.Playlist], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [music_entity_1.Music]),
    __metadata("design:returntype", Promise)
], MusicResolver.prototype, "playlists", null);
exports.MusicResolver = MusicResolver = __decorate([
    (0, graphql_1.Resolver)(() => music_entity_1.Music),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], MusicResolver);
//# sourceMappingURL=music.resolver.js.map