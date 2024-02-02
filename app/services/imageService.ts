import { v4 as uuidv4 } from 'uuid';

import { config } from '../config';
import { S3 } from '../libs/s3';

export interface ITodo {
  title: string;
  desc: string;
}

class ImageService {
  private S3Client: any;
  private bucketName = config.S3_BUCKET_NAME;

  constructor() {
    this.S3Client = S3;
  }

  async saveImage(dataBuffer: Buffer, originalName: string, fileType: string) {
    try {
      const fileName = `${uuidv4()}-${originalName}`;
      const encodeFileName = encodeURIComponent(fileName);
      const bucketName = this.bucketName;
      const params = {
        Bucket: bucketName,
        Key: encodeFileName,
        Body: dataBuffer,
        ContentType: fileType,
      };

      const { Location } = await this.S3Client.upload(params).promise();

      return Location;
    } catch (err: any) {
      throw new Error(
        `ImageService.saveImage error, err.message: ${err.message}`
      );
    }
  }
}

export const imageService = new ImageService();
