import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User> & { _id: Types.ObjectId }; // ✅ Ensure `_id` exists

@Schema({ timestamps: true })
export class User {
  _id!: Types.ObjectId; // Explicitly define _id

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ type: [String], default: ['USER'] })
  roles!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
