const manager=require('../models/manager');


class managerServices{
    static async getAllBranches(){
        const branches=await manager.getAllBranches();
        return branches;
    }
    static async getAllJobTitles(){
        const Jobtypes=await manager.getAllJobTitles();
        return Jobtypes;
    }
    static async getAllDepartments(){
        const departments=await manager.getAllDepartments();
        return departments;
    }
    static async getEmployeeList(branch,department,jobtype){
        var querySelect=1;//default
        if(department == 'allDepartments' && jobtype == 'allJobtypes'){
            querySelect=1;
        }
        else if(department == 'allDepartments'){
            querySelect=2;
        }
        else if(jobtype == 'allJobtypes'){
            querySelect=3;
        }
        else{
            querySelect=4;
        }
        const employeeList=await manager.getEmployees(branch,department,jobtype,querySelect);
        // console.log(employeeList);
        return employeeList;
    }
  

}
module.exports=managerServices;