import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UserSoapService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createUser(args: { name: string; age: number }) {
    const { data, error } = await this.supabaseService.user
      .insert({ name: args.name, age: args.age })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  }

  async getUser(args: { id: number }) {
    const { data, error } = await this.supabaseService.user
      .select('*')
      .eq('id', args.id)
      .single();
    if (error) throw new Error(error.message);
    return { user: data };
  }

  async updateUser(args: { id: number; name: string; age: number }) {
    const { error } = await this.supabaseService.user
      .update({ name: args.name, age: args.age })
      .eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deleteUser(args: { id: number }) {
    const { error } = await this.supabaseService.user.delete().eq('id', args.id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async listUsers() {
    const { data, error } = await this.supabaseService.user.select('*');
    if (error) throw new Error(error.message);
    return { users: { item: data || [] } };
  }
}
