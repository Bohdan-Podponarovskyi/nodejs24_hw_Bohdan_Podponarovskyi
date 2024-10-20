import * as Joi from 'joi';
import { NODE_ENV } from './constants';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NODE_ENV))
    .required(),
  PORT: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  THROTTLE_TTL: Joi.number().required(),

  MONGO_DB_URI: Joi.string().required(),
});