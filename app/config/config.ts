import * as dotenv from 'dotenv';
dotenv.config();

const TABLE_NAME = process.env.TABLE_NAME || 'node-aws';
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;

const config = {
  TABLE_NAME: TABLE_NAME,
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  },
};

export { config };
