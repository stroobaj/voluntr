import { BaseRepository } from '@/database/base.repository';
import { User } from '@/user/schema/user.schema';

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  updateRole(id: string, role: string): Promise<User | null>;
}
