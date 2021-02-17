const sql = require("../connection");
const OrganizationServices = require("../services/organizationServices");
const {adminRegisterValidator,addHRvalidator,} = require("../validaters/registerValidator");
const hrService = require("../services/hrService");

var employeeSet = { column: [], details: [], selectTypes:[] };
var departmentSet = [];

class HRController {
  static async loginHR(req, res) {
    // res.render("HR/index", {});
    res.redirect("/HR/home");
  }
  static async index(req, res) {
    res.render("HR/home", {
      user: req.session.user,
    });
  }
  static async abc(req, res) {
    const a = 1;
    const r = await sql`select * from get_leaverequests('jjj')`;
    res.send(r);
    console.log(r);
  }

  static async addEmployeePage(req, res) {
    try {
      const branches = await OrganizationServices.getAllBranches();
      const Jobtypes = await OrganizationServices.getAllJobTitle();
      const departments = await OrganizationServices.getAllDepartment();
      const payGrades = await OrganizationServices.getAllPayGradeLevel();
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
        HR: {},
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
    const Jobtypes = await OrganizationServices.getAllJobTitle();
    const departments = await OrganizationServices.getAllDepartment();
    const payGrades = await OrganizationServices.getAllPayGradeLevel();
    const employee_statuses = await OrganizationServices.getEmployeeStatus();
    const HR = {};
    HR.NIC = req.body.NIC;
    HR.first_name = req.body.first_name;
    HR.middle_name = req.body.middle_name;
    HR.last_name = req.body.last_name;
    HR.gender = req.body.gender;
    HR.birthday = req.body.birthday;
    HR.address_id = req.body.address_id;
    HR.country = req.body.country;
    HR.email = req.body.email;
    HR.phone = req.body.phone;
    HR.city = req.body.city;
    HR.postal_code = req.body.postal_code;

    try {
      const empAdd = await hrService.addEmployee(req.body);
      console.log(empAdd);
      const success = "HR added sucessfully. you can logged in using emp";
      res.redirect("HR/viewEmployee/<%= empAdd.employee_id %>");
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

  static async viewEmployee(req, res) {
    //render karaddi ywanna ona variables --> employeedata, editaccess(true/false)
    //false nam--> edit button ekk pennana one. true nam --> save button eka pennanna one
    const id = req.params.id;
    if (!id) {
      console.log("ewdwedwed");
    } else {
      console.log(id);
      //employee data tika array ekta dala redirect karanwa manager/viewData
      //editAccess--false
    }

    res.render("HR/viewEmployee", {
      id: emloyeeData,
      editAccess: editAccess,
    });
  }

  static async report(req, res) {
    const branches = await OrganizationServices.getAllBranches();
    const Jobtypes = await OrganizationServices.getAllJobTitle();
    const departments = await OrganizationServices.getAllDepartment();
    const payGrades = await OrganizationServices.getAllPayGradeLevel();
    const employee_statuses = await OrganizationServices.getEmployeeStatus();

    res.render("HR/employeeReports", {
      user: req.session.user,
      error: req.query.error,
      branches: branches,
      Jobtypes: Jobtypes,
      departments: departments,
      payGrades: payGrades,
      employee_statuses: employee_statuses,
      employeeList: employeeSet,
    });
    employeeSet = { column: [], details: [], selectTypes: [] };
  }
  static async findReport(req, res) {
    var branch = req.body.branch_name;
    var department = req.body.department;
    var jobTitle = req.body.jobTitle;
    var payGrade = req.body.payGrade;
    var customize=false;
    var fields = [];
    // console.log(branch);
    // console.log(department);
    // console.log(jobtype);
    try {
      employeeSet = await hrService.getEmployeeList(
        branch,
        department,
        jobTitle,
        payGrade,
        customize,
        fields
      );
      res.redirect("report");
    } catch (error) {}
  }
  static async customreport(req, res) {
    const branches = await OrganizationServices.getAllBranches();
    const Jobtypes = await OrganizationServices.getAllJobTitle();
    const departments = await OrganizationServices.getAllDepartment();
    const payGrades = await OrganizationServices.getAllPayGradeLevel();
    const employee_statuses = await OrganizationServices.getEmployeeStatus();
    const fieds = await hrService.getEmpFields();

    res.render("HR/customizeReports", {
      user: req.session.user,
      error: req.query.error,
      branches: branches,
      Jobtypes: Jobtypes,
      departments: departments,
      payGrades: payGrades,
      employee_statuses: employee_statuses,
      employeeList: employeeSet,
      customFields: fieds,
    });
    employeeSet = { column: [], details: [], selectTypes: [] };
  }

  static async findCustomReport(req, res) {
    var branch = req.body.branch_name;
    var department = req.body.department;
    var jobTitle = req.body.jobTitle;
    var payGrade = req.body.payGrade;
    var customize = true;
    var fields = req.body.field;
    try {
      employeeSet = await hrService.getEmployeeList(
        branch,
        department,
        jobTitle,
        payGrade,
        customize,
        fields
      );
      res.redirect("customreport");
    } catch (error) {}
  }



  static async leaveReport(req, res) {
    
    try {
      res.render("HR/leaveReport",{
      departmentlist: departmentSet,
      dates:{}
    });
    departmentSet=[]
    } catch (error) {
      throw error
    }
    
  }

  static async findleaveReport(req, res) {
    const inpdate = { 
      startDate: req.body.startdate,
      endDate: req.body.endDate,
    }
    console.log(req.body);
    try {
      departmentSet = await hrService.getDepartmentLeaves(inpdate.startDate,inpdate.endDate);
      res.render("HR/leaveReport",{
      departmentlist: departmentSet,
      dates: inpdate
    });
    } catch (error) {
      throw error
    }
   
  }


}
module.exports=HRController