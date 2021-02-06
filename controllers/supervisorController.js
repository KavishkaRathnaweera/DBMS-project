const Supervisor = require("../models/supervisor");

class SupervisorController {
  static async supervisor(req, res) {
    res.render("./supervisor/dashboard", {});
  }

  static async employee(req, res) {
    res.render("./supervisor/employees", {});
  }

  static async attendence(req, res) {
    res.render("./supervisor/attendence", {});
  }
  static async leaves(req, res) {
    try {
      const requests = await Supervisor.getAllLeavingRequests();
      res.render("./supervisor/leaves", {
        requestLst: requests,
      });
    } catch (error) {}
  }

  static async leaveRequest(req, res) {
    let leave_id = req.params.request;
    const leave = await Supervisor.findByID(leave_id);
    const remaining_leaves = await Supervisor.getRemainingLeaves(
      leave[0].employee_id
    );
    console.log(leave);
    // const date = new Date(leave[0].start_date);
    var date = new Date(leave[0].start_date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var newdate = [date.getFullYear(), mnth, day].join("-");
    console.log(leave[0].start_date);
    console.log(newdate);
    // console.log(date.getMonth());
    // console.log(date.getFullYear());
    console.log(remaining_leaves);
    res.render("./supervisor/leaveRequest", {
      leave: leave,
      remaining_leaves: remaining_leaves,
      date: newdate,
    });
  }
}

module.exports = SupervisorController;
