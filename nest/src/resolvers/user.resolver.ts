import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Playlist } from '../entities/playlist.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';
import { AddPlaylistToUserInput } from '../inputs/add-playlist-to-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    const { data, error } = await this.supabaseService.user.select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    const { data, error } = await this.supabaseService.user
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const { data, error } = await this.supabaseService.user
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    const { id, ...updateData } = input;
    const { data, error } = await this.supabaseService.user
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const { error } = await this.supabaseService.user.delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  @Mutation(() => Boolean)
  async addPlaylistToUser(@Args('input') input: AddPlaylistToUserInput): Promise<boolean> {
    const { data, error } = await this.supabaseService.userPlaylist
      .insert({
        userId: input.userId,
        playlistId: input.playlistId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return !!data;
  }

  @Mutation(() => Boolean)
  async removePlaylistFromUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('playlistId', { type: () => Int }) playlistId: number,
  ): Promise<boolean> {
    const { error } = await this.supabaseService.userPlaylist
      .delete()
      .eq('userId', userId)
      .eq('playlistId', playlistId);
    if (error) throw new Error(error.message);
    return true;
  }

  @ResolveField(() => [Playlist], { nullable: true })
  async playlists(@Parent() user: User): Promise<Playlist[]> {
    const { data: userPlaylistData, error: userPlaylistError } = 
      await this.supabaseService.userPlaylist
        .select('playlistId')
        .eq('userId', user.id);

    if (userPlaylistError || !userPlaylistData?.length) {
      return [];
    }

    const playlistIds = userPlaylistData.map((up) => up.playlistId);
    const { data, error } = await this.supabaseService.playlist
      .select('*')
      .in('id', playlistIds);

    if (error) throw new Error(error.message);
    return data || [];
  }
}

