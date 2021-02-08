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
    static async getEmployees(branch,department,jobtype,user,querySelect){
        var employees;
      switch(querySelect){
        case 1:
          employees=await sql`
          select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) where branch_id = ${branch} and job_title != ${user}`;
          return employees;
        case 2:
            employees=await sql`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_id = ${branch} and job_title  = ${jobtype}`;
            return employees;
        case 3:
            employees=await sql`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_id = ${branch} and dept_name = ${department} and job_title != ${user}`;
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
    
  static async getSupervisorGroup(supervisor_id){
    const supervisor_employees=await sql`
    select employee_id,first_name,last_name from supervisor join personal_information using(employee_id) where supervisor_id = ${supervisor_id}`;
    return supervisor_employees;
}

static async getEmployeesToaddSupervisorT(branch,department,user){
    const toAddSupervisor_employees=await sql`
    select employee_id,first_name,last_name from employee join personal_information using(employee_id) 
    where branch_id = ${branch} and dept_name = ${department} and job_title != ${user} 
    and employee_id not in (select distinct(employee_id) from supervisor)`;
    return toAddSupervisor_employees;
}

static async saveSupervisor(supervisor_id){
    const result=await sql`
    update employee set supervisor= 'true' where employee_id = ${supervisor_id}`;
    return result;
}
static async saveSupervisorGroup(supervisor_id,supervisorGroupemployeeIDs){
    console.log(supervisor_id);
    console.log(supervisorGroupemployeeIDs);
    // const result = await sql`CALL addToSupervisorT($1,$2)`,[supervisorGroupemployeeIDs, supervisor_id];
    // const parameters=[supervisorGroupemployeeIDs,supervisor_id];
    // console.log(parameters);
    const result=await sql(`
    CALL addToSupervisorT($1,$2)`,[supervisorGroupemployeeIDs,supervisor_id]);
    return result;
} 
static async getSupervisors(){
    const result=await sql`
    select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id)
    where supervisor = true`;
    return result;
}
static async getSupervisor(emp_id){
    const result=await sql`
    select supervisor_id from supervisor where employee_id = ${emp_id}`;
    return result;
}
static async SupervisorDelete(emp_id){
    const result=await sql`
    update employee set supervisor= 'false' where employee_id = ${emp_id}`;
    return result;
}


}
module.exports=manager;