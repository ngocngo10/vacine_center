const AWS = require('aws-sdk');
const { generateQRcodeImage } = require('./generate_qr_code');
require('dotenv').config();
AWS.config.update({ region: 'ap-southeast-1' });

async function sendEmailConfirmAppointment(emailAddress, data) {
  const image = await generateQRcodeImage(data);
  const params = {
    Destination: {
      ToAddresses: [
        emailAddress
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<p>Cảm ơn bạn đã xác nhận tham gia cuộc hẹn.
            Dưới đây là mã QR code của bạn.
            Hãy quét mã này với nhân viên để được checkin đúng giờ.</p>
            ${image}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Xác nhận lịch hẹn thành công.'
      }
    },
    Source: 'no-reply@mail.vuongtran.info',
  };

  const sendPromise = new AWS.SES({ 
    apiVersion: '2010-12-01',
  }).sendEmail(params).promise();
  sendPromise.then(
    function (data) {
      console.log(data.MessageId);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });
}

module.exports = {
  sendEmailConfirmAppointment,
}
