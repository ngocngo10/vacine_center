const PHONE_NUMBER_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const FULL_NAME_PATTERN = /^.{3,40}$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

export default {
  PHONE_NUMBER_PATTERN,
  FULL_NAME_PATTERN,
  PASSWORD_PATTERN
};
