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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const create_user_input_1 = require("../inputs/create-user.input");
let UserController = class UserController {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.user.select('*');
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.user
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findPlaylists(id) {
        const { data: userPlaylistData, error: userPlaylistError } = await this.supabaseService.userPlaylist
            .select('playlistId')
            .eq('userId', id);
        if (userPlaylistError || !userPlaylistData?.length) {
            return [];
        }
        const playlistIds = userPlaylistData.map((up) => up.playlistId);
        const { data, error } = await this.supabaseService.playlist
            .select('*')
            .in('id', playlistIds);
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    async create(input) {
        const { data, error } = await this.supabaseService.user
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async update(id, input) {
        const { data, error } = await this.supabaseService.user
            .update(input)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async remove(id) {
        const { error } = await this.supabaseService.user.delete().eq('id', id);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'User deleted successfully' };
    }
    async addPlaylist(userId, input) {
        const { data, error } = await this.supabaseService.userPlaylist
            .insert({
            userId,
            playlistId: input.playlistId,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return { success: true, data };
    }
    async removePlaylist(userId, playlistId) {
        const { error } = await this.supabaseService.userPlaylist
            .delete()
            .eq('userId', userId)
            .eq('playlistId', playlistId);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'Playlist removed from user' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/playlists'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findPlaylists", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/playlist'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addPlaylist", null);
__decorate([
    (0, common_1.Delete)(':id/playlist/:playlistId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('playlistId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removePlaylist", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], UserController);
//# sourceMappingURL=user.controller.js.map