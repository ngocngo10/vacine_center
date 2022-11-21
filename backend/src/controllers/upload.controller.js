const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'ap-southeast-1';

function getS3SignedURL(req, res) {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  const fileName = new Date().valueOf() + req.query['file-name'];
  const fileType = req.query['file-type'];
  const bucketName = req.query['bucket-name'];
  const s3Params = {
    Bucket: S3_BUCKET + '/' + bucketName,
    Key: fileName,
    Expires: 60,
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

module.exports = { getS3SignedURL };
