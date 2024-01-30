import AWS from 'aws-sdk';
import { config } from './config';

AWS.config.update({
  region: config.aws_remote_config.region,
  accessKeyId: config.aws_remote_config.accessKeyId,
  secretAccessKey: config.aws_remote_config.secretAccessKey,
});

const TABLE_NAME = config.TABLE_NAME;
const dynamodb = new AWS.DynamoDB.DocumentClient();

export { dynamodb, TABLE_NAME };
