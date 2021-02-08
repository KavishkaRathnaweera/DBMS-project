const Organization=require("../models/organization")
class OrganizationServices{
    static async getAllBranches(){
        const branches=await Organization.getAllBranches()
        return branches;
    }
    static async getAllJobTitle(){
        const Jobtype=await Organization.getAllJobTitle()
        return Jobtype;
    }
    static async getAllDepartment(){
        const department=await Organization.getAllDepartment();
        return department;
    }
    static async getAllPayGradeLevel(){
        const payGrade=await Organization.getAllPayGradeLevel();
        return payGrade;
    }
    static async getEmployeeStatus(){
        const employee_status=await Organization.getEmployeeStatus();
        return employee_status; 
    }
    static async getLeaves(){
        const leaves=await Organization.getLeaves();
        return leaves
    }
    static async getLeave(paygrade_level){
        const leave=await Organization.getLeave(paygrade_level);
        return leave
    }
    static async setLeave(paygrade_level,{anual, casual, maternity, no_pay}){
       return await Organization.setLeave(paygrade_level,anual, casual, maternity, no_pay);
    }
    static async getAllBranchesWithAdress(){
        return await Organization.getAllBranchesWithAddress()
    }
    static async addBranch({branch_name, address,city, postal_code, country}){
        return await Organization.addBranch(branch_name, address,city, postal_code, country)
    }
    
    

}
module.exports=OrganizationServices