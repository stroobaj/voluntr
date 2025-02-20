import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/user/schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).lean().exec();
  }

  async updateRole(id: string, role: string): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { roles: [role] } },
        { new: true, runValidators: true }
      )
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
}
