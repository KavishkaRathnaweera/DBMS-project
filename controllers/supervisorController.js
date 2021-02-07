const Supervisor = require("../models/supervisor");

class SupervisorController {
  static async supervisor(req, res) {
    res.render("./supervisor/dashboard", {});
  }

  static async employee(req, res) {
    const employees = await Supervisor.getEmployees();
    console.log(employees);
    res.render("./supervisor/employees", {
      employeeLst: employees,
    });
  }

  static async attendence(req, res) {
    res.render("./supervisor/attendence", {});
  }
  static async leaves(req, res) {
    const requests = await Supervisor.getAllLeavingRequests();
    res.render("./supervisor/leaves", {
      requestLst: requests,
    });
  }

  static async leaveRequest(req, res) {
    let leave_id = req.params.request;
    const leave = await Supervisor.findByID(leave_id);
    const remaining_leaves = await Supervisor.getRemainingLeaves(
      leave[0].employee_id
    );

    var date = new Date(leave[0].start_date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var newdate = [date.getFullYear(), mnth, day].join("-");
    res.render("./supervisor/leaveRequest", {
      leave: leave,
      remaining_leaves: remaining_leaves,
      date: newdate,
    });
  }

  static async approve(req, res) {
    const get = await Supervisor.approveLeave(req.body);
    res.render("./supervisor/dashboard", {});
    // console.log(req.body);
  }
}

module.exports = SupervisorController;
