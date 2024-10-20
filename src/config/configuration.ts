import { NODE_ENV } from './constants';

export const configuration = () => ({
  application: {
    NODE_ENV: process.env.NODE_ENV || NODE_ENV.Development,
    port: parseInt(process.env.PORT, 10) || 3000,
    throttlerTTL: process.env.THROTTLE_TTL,
    throttlerLimit: process.env.THROTTLE_LIMIT,
  },
  mongodb: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
  },
});