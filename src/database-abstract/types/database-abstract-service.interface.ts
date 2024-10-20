export interface DatabaseAbstractServiceInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne(table: string, data: any): Promise<any>;
  findOne(table: string, query: any): Promise<any>;
  findOneById(table: string, id: string): Promise<any>;
  findByIdAndUpdate(table: string, id: string, data: any): Promise<any>;
  findAll(table: string): Promise<any>;
  findByIdAndDelete(table: string, id: string): Promise<any>;
}