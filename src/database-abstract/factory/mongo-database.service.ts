import { Injectable, Logger } from '@nestjs/common';
import { DatabaseAbstractService } from '../database-abstract.service';
import mongoose, { Mongoose } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MongooseModelsMapEnum } from '../types/enums/mongodb-model-map.enum';
import { UserModel } from '../models/user.model';


@Injectable()
export class MongoDatabaseService extends DatabaseAbstractService {
  private readonly logger = new Logger(MongoDatabaseService.name);

  private client: Mongoose;
  private readonly mongoUri: string;

  constructor(configService: ConfigService) {
    super();

    this.mongoUri = configService.get<string>('mongodb.MONGO_DB_URI');
  }

  async connect(): Promise<void> {
    this.client = await mongoose.connect(this.mongoUri);
    this.logger.log(`Connected to MongoDB`);
  }

  async disconnect(): Promise<void> {
    await this.client.connection.close();
    this.logger.log('Disconnected from MongoDB');
  }

  async insertOne(table: MongooseModelsMapEnum, data: any): Promise<any> {
    const model = this.getModel(table);

    const insertEntity = new model(data);

    return await insertEntity.save();
  }

  async findOne(table: MongooseModelsMapEnum, query: any): Promise<any> {
    const model = this.getModel(table);

    return model.findOne(query).lean();
  }

  async findOneById(table: MongooseModelsMapEnum, id: string): Promise<any> {
    const model = this.getModel(table);

    return model.findById(id).lean();
  }

  async findAll(table: MongooseModelsMapEnum): Promise<any> {
    const model = this.getModel(table);

    return model.find().lean();
  }

  async findByIdAndUpdate(table: MongooseModelsMapEnum, id: string, data: any): Promise<any> {
    const model = this.getModel(table);

    return model.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async findByIdAndDelete(table: MongooseModelsMapEnum, id: string): Promise<any> {
    const model = this.getModel(table);

    return model.findByIdAndDelete(id).lean();
  }

  private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;

      default:
        break;
    }
  }
}