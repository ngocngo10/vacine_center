const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'ap-southeast-1';
const { UploadService } = require('../services');
const service = new UploadService();

function getS3SignedURL(req, res, next) {
  const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
  });
  const fileName = new Date().valueOf() + req.query['file-name'];
  const fileType = req.query['file-type'];
  const bucketName = req.query['bucket-name'];
  const s3Params = {
    Bucket: S3_BUCKET + '/' + bucketName,
    Key: fileName,
    Expires: 60 * 5,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${bucketName}/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
}

async function uploadExcel(req, res, next) {
  try {
    await service.uploadVaccineItem(req);
    res.json({ message: 'Created' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getS3SignedURL,
  uploadExcel
};
