const Organization=require("../models/organization")
class OrganizationServices{
    static async getAllBranches(){
        const branches=await Organization.getAllBranches()
        return branches;
    }
    static async getHRJobTitle(){
        const Jobtype=await Organization.getHRJobTitle()
        return Jobtype;
    }
    static async getHRDepartment(){
        const department=await Organization.getHRDepartment();
        return department;
    }
    static async getHRPayGradeLevel(){
        const payGrade=await Organization.getHRPayGradeLevel();
        return payGrade;
    }
    static async getEmployeeStatus(){
        const employee_status=await Organization.getEmployeeStatus();
        return employee_status;
    }
}
module.exports=OrganizationServices