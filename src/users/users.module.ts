import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseAbstractModule } from '../database-abstract/database-abstract.module';
import { DatabaseTypeEnum } from '../database-abstract/types/enums/database-type.enum';

@Module({
  imports: [DatabaseAbstractModule.register(DatabaseTypeEnum.MONGODB)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
