import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserRepository } from '@/user/repository/user.repository';
import { USER_REPOSITORY } from '@/database/database.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async create(
    email: string,
    password: string,
    roles: string[],
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    return this.userRepo.create({
      email,
      password,
      firstName,
      lastName,
      roles,
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepo.update(id, data);
    if (!updatedUser)
      throw new NotFoundException(`User with ID ${id} not found`);
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userRepo.delete(id);
    if (!deletedUser)
      throw new NotFoundException(`User with ID ${id} not found`);
    return deletedUser;
  }

  async updateRole(id: string, role: string): Promise<User | null> {
    return this.userRepo.updateRole(id, role);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
