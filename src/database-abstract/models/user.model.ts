import * as mongoose from 'mongoose';
import { MongooseModelsMapEnum } from '../types/enums/mongodb-model-map.enum';

export const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isStudent: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

export const UserModel = mongoose.model(MongooseModelsMapEnum.USER, UserSchema);