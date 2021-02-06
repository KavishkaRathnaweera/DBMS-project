const sql =require('../connection');
class manager{

    static async getAllBranches(){
        const branches =await sql`
        select branch_id, branch_name from branch`;
        return branches;
    }
    static async getAllJobTitles(){
        const Jobtypes=await sql`
        select job_title from job_type`;
        return Jobtypes;
    }
    static async getAllDepartments(){
        const departments=await sql`
        select dept_name from department`;
        return departments;
    }
    static async getEmployees(branch,department,jobtype,querySelect){
        var employees;
      switch(querySelect){
        case 1:
          employees=await sql`
          select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) where branch_id = ${branch}`;
          return employees;
        case 2:
            console.log(545456);
            employees=await sql`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_id = ${branch} and job_title  = ${jobtype}`;
            return employees;
        case 3:
            employees=await sql`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_id = ${branch} and dept_name = ${department}`;
            return employees;
        case 4:
            employees=await sql`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_id = ${branch} and dept_name = ${department} and job_title  = ${jobtype} `;
            return employees;
        default:
            console.log(querySelect);
      };

  }
    





}
module.exports=manager;