import AWS from 'aws-sdk';
import { config } from '../config';

const S3 = new AWS.S3({ region: config.aws_remote_config.region });

const checkBucketExisted = async () => {
  const { Buckets } = await S3.listBuckets().promise();
  const bucketToBeFound = Buckets?.find(
    ({ Name }) => Name === config.S3_BUCKET_NAME
  );
  return bucketToBeFound ? true : false;
};

const createBucket = async () => {
  const params = {
    Bucket: config.S3_BUCKET_NAME || 'nbhh-aws-bucket',
  };

  try {
    const { Location } = await S3.createBucket(params).promise();
    console.log(`Bucket created with location ${Location}`);
  } catch (err) {
    console.error(err);
  }
};

if (!checkBucketExisted) {
  createBucket();
}

export { S3 };
