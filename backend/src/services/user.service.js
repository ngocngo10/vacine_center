const { UserRepository } = require('../repositories');
const ErrorCreator = require('../utils/error_createtor');
const bcrypt = require('bcryptjs');
module.export = class UserService {
  constructor() {
    this.repository = userRepository;
  }
  async createUser(requestBody) {
    const rawPassword = requestBody.password;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hash(rawPassword, salt);
    const userInfo = {
      ...requestBody,
      password
    }
    const isExist = await checkUserExisted(userInfo.phoneNumber);
    if (isExist) {
      console.log('User is existed');
      throw new ErrorCreator('User is existed', 400);
    }
    const newUser = await this.repository.createUser(userInfo);
    sendEmail();
  }
  
  async listUsers(requestQuery) {
    const userInfo = {
      ...requestQuery
    }
    
    return this.repository.findAllUsers(userInfo);
  }
  
  async checkUserExisted(phoneNumber) {
    return this.repository.findUserByPhoneNumber(phoneNumber);
  }
  
  async sendEmail() {
    console.log('Sending email')
  }
}
