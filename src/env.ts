import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  TEST_DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

export default {
  NODE_ENV,
  PORT: PORT || 5000,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  TEST_DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
