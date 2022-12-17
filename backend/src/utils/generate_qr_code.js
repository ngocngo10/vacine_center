const QRCode = require('qrcode');
const aws = require('aws-sdk');
require('dotenv').config();
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'ap-southeast-1';

async function generateQRcodeImage(data) {
  const url = await uploadQRCode(data);
  const img = `<img src="${url}" />`;
  return img;
}

async function uploadQRCode(data) {
  const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
  });
  const fileName = `QRCode-${new Date().valueOf()}.png`;
  let qrCode = await QRCode.toBuffer(data);
  let params = {
    Bucket: S3_BUCKET + '/qr',
    Key: fileName,
    Body: qrCode,
    ContentType: 'image/png',
    ACL: 'public-read'
  };
  await s3.putObject(params).promise();
  const url = `https://${S3_BUCKET}.s3.ap-southeast-1.amazonaws.com/qr/${fileName}`;
  return url;
}

module.exports = {
  generateQRcodeImage
};
