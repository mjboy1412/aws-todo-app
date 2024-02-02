import * as dotenv from 'dotenv';
dotenv.config();

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
const LOCAL_PORT = process.env.LOCAL_PORT;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

const config = {
  S3_BUCKET_NAME: S3_BUCKET_NAME,
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  },
  // Provide port for local development enviroment
  LOCAL_PORT: LOCAL_PORT,
};

export { config };
