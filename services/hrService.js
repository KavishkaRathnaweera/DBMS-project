const Error = require("../helpers/error");
const hrManager = require("../models/hrManager");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const User = require("../models/user");

class hrServices {
  static async addEmployee({
    NIC,
    email,
    first_name,
    middle_name,
    last_name,
    phone,
    gender,
    birthday,
    address_id,
    city,
    postal_code,
    password,
    repassword,
    branch,
    jobTitle,
    department,
    payGrade,
    empStatus,
    salary,
    submitButton,
  }) {
    const isEmailRegistered = await user.findUserByEmail(email);
    if (isEmailRegistered) {
      throw new Error.BadRequest("email is already registered");
    }
    const isNICRegistered = await User.findUserByNIC(NIC);
    if (isNICRegistered) {
      throw new Error.BadRequest("NIC is already registered");
    }
    const hashpwd = await bcrypt.hash(password, 10);
    const HR = await hrManager.addEmployee(
      NIC,
      email,
      first_name,
      middle_name,
      last_name,
      phone,
      gender,
      birthday,
      address_id,
      city,
      postal_code,
      hashpwd,
      branch,
      jobTitle,
      department,
      payGrade,
      empStatus,
      salary
    );
    return HR;
  }
}
module.exports = hrServices;
