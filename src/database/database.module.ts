import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@mongo:${process.env.MONGO_DB_PORT}/`),
  ],
})

export class DatabaseModule implements OnModuleInit {
  onModuleInit() {
    console.log('Successfully connected to MongoDB');
  }
}