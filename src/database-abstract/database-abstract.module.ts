import { DatabaseTypeEnum } from './types/enums/database-type.enum';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseService } from './factory/database-service.factory';
import { DatabaseAbstractServiceInterface } from './types/database-abstract-service.interface';

@Module({})
export class DatabaseAbstractModule {
  static register(databaseType: DatabaseTypeEnum): DynamicModule {
    return {
      module: DatabaseAbstractModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DATABASE_SERVICE',
          useFactory: (configService: ConfigService) =>
            createDatabaseService(databaseType, configService),
          inject: [ConfigService],
        },
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async (databaseService: DatabaseAbstractServiceInterface) => {
            await databaseService.connect();

            return databaseService;
          },
          inject: ['DATABASE_SERVICE'],
        }
      ],
      exports: ['DATABASE_CONNECTION'],
    }
  }
}