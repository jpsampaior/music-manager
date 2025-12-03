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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../entities/user.entity");
const playlist_entity_1 = require("../entities/playlist.entity");
const supabase_service_1 = require("../supabase/supabase.service");
const create_user_input_1 = require("../inputs/create-user.input");
const update_user_input_1 = require("../inputs/update-user.input");
const add_playlist_to_user_input_1 = require("../inputs/add-playlist-to-user.input");
let UserResolver = class UserResolver {
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
    async createUser(input) {
        const { data, error } = await this.supabaseService.user
            .insert(input)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async updateUser(input) {
        const { id, ...updateData } = input;
        const { data, error } = await this.supabaseService.user
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async removeUser(id) {
        const { error } = await this.supabaseService.user.delete().eq('id', id);
        if (error)
            throw new Error(error.message);
        return true;
    }
    async addPlaylistToUser(input) {
        const { data, error } = await this.supabaseService.userPlaylist
            .insert({
            userId: input.userId,
            playlistId: input.playlistId,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return !!data;
    }
    async removePlaylistFromUser(userId, playlistId) {
        const { error } = await this.supabaseService.userPlaylist
            .delete()
            .eq('userId', userId)
            .eq('playlistId', playlistId);
        if (error)
            throw new Error(error.message);
        return true;
    }
    async playlists(user) {
        const { data: userPlaylistData, error: userPlaylistError } = await this.supabaseService.userPlaylist
            .select('playlistId')
            .eq('userId', user.id);
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
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_playlist_to_user_input_1.AddPlaylistToUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addPlaylistToUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('playlistId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removePlaylistFromUser", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [playlist_entity_1.Playlist], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "playlists", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map