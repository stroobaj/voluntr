import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find all users
   */
  async findAll() {
    return this.userModel.find().select('-password');
  }

  /**
   * Find a user by ID
   */
  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  /**
   * Create a new user
   */
  async create(email: string, password: string) {
    return this.userModel.create({ email, password, role: 'user' });
  }

  /**
   * Update a user's role
   */
  async updateRole(id: string, role: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
