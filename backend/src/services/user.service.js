const { userRepository } = require('../repositories');
const ErrorCreator = require('../utils/error_createtor')

async function createUser(requestBody) {
  const userInfo = {
    ...requestBody
  }
  const isExist = await checkUserExisted(userInfo.phoneNumber);
  if (isExist) {
    console.log('User is existed');
    throw new ErrorCreator('User is existed', 400);
  }
  await userRepository.createUser(userInfo);
  await sendEmail();
}

async function listUsers(requestQuery) {
  const userInfo = {
    ...requestQuery
  }
  
  return userRepository.findAllUsers(userInfo);
}

async function checkUserExisted(phoneNumber) {
  return userRepository.findUserByPhoneNumber(phoneNumber);
}

async function sendEmail() {
  console.log('Sending email')
}

module.exports = {
  createUser,
  listUsers,
};
