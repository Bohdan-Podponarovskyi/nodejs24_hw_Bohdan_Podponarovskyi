// import { Module, OnModuleInit } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
//
// @Module({
//   imports: [
//     ConfigModule.forRoot({}),
//     MongooseModule.forRoot(process.env.MONGO_DB_URI),
//   ],
//   providers: [
//
//   ],
// })
//
// export class DatabaseModule implements OnModuleInit {
//   onModuleInit() {
//     console.log('Successfully connected to MongoDB');
//     console.log(process.env.MONGO_DB_URI);
//   }
// }