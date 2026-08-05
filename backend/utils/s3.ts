import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const region = process.env.S3_ENDPOINT?.split('.')[1] || 'us-east-001';

export const s3 = new S3Client({
  endpoint: `https://${process.env.S3_ENDPOINT}`,
  region: region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export const uploadToS3 = async (
  buffer: Buffer,
  fileName: string,
  mimetype: string,
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  });
  await s3.send(command);
  return fileName;
};

export const getDownloadUrl = async (fileName: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
  });

  return await getSignedUrl(s3, command, { expiresIn: 86400 });
};
