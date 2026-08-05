import { Model } from 'mongoose';
import cloudinary from './cloudinary';
import sharp from 'sharp';
import catchAsync from './catchAsync';
import AppError from './appError';

const processAndUploadImage = async (
  buffer: Buffer,
  folder: string,
  prefix: string,
): Promise<string> => {
  const processedBuffer = await sharp(buffer)
    .resize(1200, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${prefix}-${Date.now()}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      },
    );
    stream.end(processedBuffer);
  });
};

export default processAndUploadImage;
