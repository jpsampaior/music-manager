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
exports.PlaylistController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const create_playlist_input_1 = require("../inputs/create-playlist.input");
let PlaylistController = class PlaylistController {
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
    async findMusics(id) {
        const { data: playlistMusicData, error: playlistMusicError } = await this.supabaseService.playlistMusic
            .select('musicId')
            .eq('playlistId', id);
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
    async findUsers(id) {
        const { data: userPlaylistData, error: userPlaylistError } = await this.supabaseService.userPlaylist
            .select('userId')
            .eq('playlistId', id);
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
    async create(input) {
        const { data, error } = await this.supabaseService.playlist
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async update(id, input) {
        const { data, error } = await this.supabaseService.playlist
            .update(input)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async remove(id) {
        const { error } = await this.supabaseService.playlist
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'Playlist deleted successfully' };
    }
    async addMusic(playlistId, input) {
        const { data, error } = await this.supabaseService.playlistMusic
            .insert({
            playlistId,
            musicId: input.musicId,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return { success: true, data };
    }
    async removeMusic(playlistId, musicId) {
        const { error } = await this.supabaseService.playlistMusic
            .delete()
            .eq('playlistId', playlistId)
            .eq('musicId', musicId);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'Music removed from playlist' };
    }
};
exports.PlaylistController = PlaylistController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/musics'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "findMusics", null);
__decorate([
    (0, common_1.Get)(':id/users'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playlist_input_1.CreatePlaylistInput]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/music'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "addMusic", null);
__decorate([
    (0, common_1.Delete)(':id/music/:musicId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('musicId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "removeMusic", null);
exports.PlaylistController = PlaylistController = __decorate([
    (0, common_1.Controller)('playlist'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PlaylistController);
//# sourceMappingURL=playlist.controller.js.map