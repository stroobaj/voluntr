import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from '@/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@/database/database.module';

console.log('🔗 Connecting to MongoDB:', process.env.DATABASE_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule.register(process.env.DB_TYPE as 'mongo' | 'dynamo'), // ✅ Choose DB dynamically
    MongooseModule.forRoot(process.env.DATABASE_URL!), // ✅ Connect Mongoose to MongoDB
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
