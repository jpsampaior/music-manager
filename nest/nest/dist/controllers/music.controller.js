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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const create_music_input_1 = require("../inputs/create-music.input");
let MusicController = class MusicController {
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
    async findPlaylists(id) {
        const { data: playlistMusicData, error: playlistMusicError } = await this.supabaseService.playlistMusic
            .select('playlistId')
            .eq('musicId', id);
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
    async create(input) {
        const { data, error } = await this.supabaseService.music
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async update(id, input) {
        const { data, error } = await this.supabaseService.music
            .update(input)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async remove(id) {
        const { error } = await this.supabaseService.music.delete().eq('id', id);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'Music deleted successfully' };
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/playlists'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findPlaylists", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_input_1.CreateMusicInput]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "remove", null);
exports.MusicController = MusicController = __decorate([
    (0, common_1.Controller)('music'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], MusicController);
//# sourceMappingURL=music.controller.js.map