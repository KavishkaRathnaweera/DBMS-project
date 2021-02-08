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
    static async getEmployeeList(branch,department,jobtype,user){
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
        const employeeList=await manager.getEmployees(branch,department,jobtype,user,querySelect);
        // console.log(employeeList);
        return employeeList;
    }
    static async getSupervisorGroup(supervisor_id){
        const supervisor_employees=await manager.getSupervisorGroup(supervisor_id);
        return supervisor_employees;
    }
    static async addToSupervisorTable({supervisor_id}){
        const supervisor_employees=await manager.addToSupervisorTable(supervisor_id);
        return supervisor_employees;
    }
    static async getEmployeesToaddSupervisorT(branch,department,user){
        const toAddSupervisor_employees=await manager.getEmployeesToaddSupervisorT(branch,department,user);
        return toAddSupervisor_employees;
    }
    static async saveSupervisorGroup(supervisor_id,supervisorGroup){
        await manager.saveSupervisor(supervisor_id);// supervisor true
        const supervisorGroupemployeeIDs=[];
        for (var i = 0; i < supervisorGroup.length; i++) {
            const employee_id=supervisorGroup[i].employee_id;
            supervisorGroupemployeeIDs.push(employee_id);
        }
        // console.log(supervisorGroupemployeeIDs);
        await manager.saveSupervisorGroup(supervisor_id,supervisorGroupemployeeIDs);
        // return toAddSupervisor_employees;
    }
    static async getSupervisorList(){
        const SupervisorList=await manager.getSupervisors();
        return SupervisorList;
    }
    static async findSupervisor(emp_id){
        var result=await manager.getSupervisor(emp_id);
        return result;
    }
    static async SupervisorDelete({employee_id}){
        var result=await manager.SupervisorDelete(employee_id);
        return result;
    }
}
module.exports=managerServices;