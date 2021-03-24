import { v2 as cloudinary } from 'cloudinary';
import env from '../env';

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

export default (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (err, result) => {
      if (err) return reject(err);
      return resolve(result.url);
    });
  });
};
