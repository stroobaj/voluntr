import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static register(databaseType: 'mongo' | 'dynamo'): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [],
      exports: [],
    };
  }
}
