import { DatabaseAbstractServiceInterface } from './types/database-abstract-service.interface';

export abstract class DatabaseAbstractService implements DatabaseAbstractServiceInterface {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne(table: string, data: any): Promise<void>;
  abstract findOne(table: string, data: any): Promise<any>;
  abstract findOneById(table: string, id: string): Promise<any>;
  abstract findByIdAndUpdate(table: string, id: string, data: any): Promise<any>;
  abstract findAll(table: string): Promise<any>;
  abstract findByIdAndDelete(table: string, id: string): Promise<any>;
}