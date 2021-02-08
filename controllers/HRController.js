const OrganizationServices = require("../services/organizationServices");
const {adminRegisterValidator,addHRvalidator,} = require("../validaters/registerValidator");
const hrService = require("../services/hrService");

class HRController {
  
  static async loginHR(req, res) {
    // res.render("HR/index", {});
    res.redirect("/HR/home");
  }

  static async addEmployeePage(req, res) {
    try {
      const branches = await OrganizationServices.getAllBranches();
      const Jobtypes = await OrganizationServices.getHRJobTitle();
      const departments = await OrganizationServices.getHRDepartment();
      const payGrades = await OrganizationServices.getHRPayGradeLevel();
      const employee_statuses = await OrganizationServices.getEmployeeStatus();
      res.render("HR/add_employee", {
        user: req.session.user,
        error: req.query.error,
        success: req.query.success,
        branches: branches,
        Jobtypes: Jobtypes,
        departments: departments,
        payGrades: payGrades,
        employee_statuses: employee_statuses,
        HR:{},
      });
    } catch (error) {
      res.render("HR/home", {
        user: req.session.user,
        error: error,
        success: "",
      });
    }
  }
  static async viewEmployee(req, res) {
    res.render("HR/viewEmployee", {});
  }

  static async submitEmployee(req, res) {
    const branches = await OrganizationServices.getAllBranches();
    const Jobtypes = await OrganizationServices.getHRJobTitle();
    const departments = await OrganizationServices.getHRDepartment();
    const payGrades = await OrganizationServices.getHRPayGradeLevel();
    const employee_statuses = await OrganizationServices.getEmployeeStatus();
    const HR = {};
    HR.NIC = req.body.NIC;
    HR.first_name = req.body.first_name;
    HR.middle_name = req.body.middle_name;
    HR.last_name = req.body.last_name;
    HR.gender = req.body.gender;
    HR.birthday = req.body.birthday;
    HR.address_id = req.body.address_id;
    HR.email = req.body.email;
    HR.phone = req.body.phone;
    HR.city = req.body.city;
    HR.postal_code = req.body.postal_code;

    try {
      const empAdd = await hrService.addEmployee(req.body);
      const success = "HR added sucessfully. you can logged in using emp";
         res.render("HR/viewEmployee", {HRM:HR});
    } catch (error) {
      res.render("HR/add_employee", {
        error: error,
        HR: HR,
        branches: branches,
        Jobtypes: Jobtypes,
        departments: departments,
        payGrades: payGrades,
        employee_statuses: employee_statuses,
      });
    }
  }

  static async home(req, res) {
    res.render("HR/home", {});
  }
  static async home(req, res) {
    res.render("HR/home", {});
  }
  static async home(req, res) {
    res.render("HR/home", {});
  }
  static async home(req, res) {
    res.render("HR/home", {});
  }
  static async home(req, res) {
    res.render("HR/home", {});
  }
}
module.exports=HRController