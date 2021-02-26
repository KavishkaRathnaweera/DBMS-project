const Employee = require("../models/employee");
class employeeController {
  static async index(req, res) {
    res.render("employee/index", {
      user: req.session.user,
    });
  }

  static async applyLeave(req, res) {
    res.render("employee/applyLeave", {});
  }

  static async leaveRecords(req, res) {
    const history = await Employee.getLeaveHistory();
    //console.log(history[0].leave_id);
    res.render("employee/leaveRecords", { history: history });
  }

  static async employeeInfo(req, res) {
    const information = await Employee.getEmployeeInfo();
    res.render("employee/employeeInfo", {information:information});
  }
  

  static async requestLeave(req, res) {
    // console.log(req.body);
    const request = await Employee.applyLeave1(req.body);
    res.render("employee/index", {
      user: req.session.user,
    });
  }
}

module.exports = employeeController;
