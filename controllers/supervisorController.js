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
    res.render("./supervisor/leaves", {});
  }
}

module.exports = SupervisorController;
