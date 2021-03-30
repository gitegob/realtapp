import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export default class CloudinaryService {
  constructor(private config: ConfigService) {}

  /** Upload to cloudinary
   *
   * @param file the file url
   * @returns
   */
  async cloudUpload(file: string): Promise<any> {
    cloudinary.config({
      cloud_name: this.config.get('cloudinary.name'),
      api_key: this.config.get('cloudinary.apiKey'),
      api_secret: this.config.get('cloudinary.apiSecret'),
    });
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, (err, result) => {
        if (err) return reject(err);
        return resolve(result.url);
      });
    });
  }
}
