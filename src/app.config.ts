import env from './env';

export default function () {
  return {
    global: {
      port: env.PORT,
      nodeEnv: env.NODE_ENV,
      serverUrl: env.SERVER_URL,
    },
    db: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      host: env.DB_HOST || 'localhost',
      port: +env.DB_PORT || 5432,
      name: env.DB_NAME,
    },
    cloudinary: {
      apiKey: env.CLOUD_API_KEY,
      apiSecret: env.CLOUD_API_SECRET,
      name: env.CLOUD_NAME,
    },
    jwt: {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRES_IN,
    },
    email: {
      apiKey: env.SGRID_KEY,
      sender: env.SENDER_EMAIL,
      newBidTemplate: env.NEW_BID_TEMPLATE,
      approvedBidTemplate: env.APPROVED_BID_TEMPLATE,
      rejectedBidTemplate: env.REJECTED_BID_TEMPLATE,
    },
  };
}
