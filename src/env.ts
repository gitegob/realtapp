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
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
  SGRID_KEY_GBRIAN,
  SGRID_KEY_TEST,
  SENDER_EMAIL,
  SERVER_URL,
  NEW_BID_TEMPLATE,
  APPROVED_BID_TEMPLATE,
  REJECTED_BID_TEMPLATE,
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
  CLOUD_API_SECRET,
  CLOUD_API_KEY,
  CLOUD_NAME,
  SGRID_KEY: NODE_ENV === 'production' ? SGRID_KEY_GBRIAN : SGRID_KEY_TEST,
  SGRID_KEY_TEST,
  SENDER_EMAIL,
  SERVER_URL,
  NEW_BID_TEMPLATE,
  APPROVED_BID_TEMPLATE,
  REJECTED_BID_TEMPLATE,
};
