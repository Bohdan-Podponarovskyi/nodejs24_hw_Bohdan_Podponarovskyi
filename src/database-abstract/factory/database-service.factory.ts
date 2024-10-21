import { DatabaseTypeEnum } from '../types/enums/database-type.enum';
import { ConfigService } from '@nestjs/config';
import { DatabaseAbstractServiceInterface } from '../types/database-abstract-service.interface';
import { MongoDatabaseService } from './mongo-database.service';

export const createDatabaseService = (
  databaseType: DatabaseTypeEnum,
  configService: ConfigService,
): DatabaseAbstractServiceInterface => {
  switch (databaseType) {
    case DatabaseTypeEnum.MONGODB:
      return new MongoDatabaseService(configService);

    default:
      break;
  }
}