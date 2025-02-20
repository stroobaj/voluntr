import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { MongoUserRepository } from '@/user/repository/mongo.user.repository';
import { USER_REPOSITORY } from '@/database/database.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ensures UserModule has access to JwtService
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register Mongoose model
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY, // NestJS DI token
      useClass: MongoUserRepository,
    },
  ],
  exports: [UserService, USER_REPOSITORY],
})
export class UserModule {}
