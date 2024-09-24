// 今のプロジェクトでは未使用
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// S3から画像のURLを取得する関数
export const getS3ImageUrl = (key: string): string => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Expires: 60 * 60,
  });
};
