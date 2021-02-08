const db =require('../connection');
class manager{

    static async getAllBranches(){
        const branches =(await db.query(`
        select branch_name from branch`)).rows;
        return branches;
    }
    static async getAllJobTitles(){
        const Jobtypes=(await db.query(`
        select job_title from job_type`)).rows;
        return Jobtypes;
    }
    static async getAllDepartments(){
        const departments=(await db.query(`
        select dept_name from department`)).rows;
        return departments;
    }
    static async getEmployees(branch,department,jobtype,user,querySelect){
        var employees;
      switch(querySelect){
        case 1:
          employees=(await db.query(`
          select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) where branch_name = $1 and job_title != $2`,[branch,user])).rows;
          return employees;
        case 2:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_name = $1 and job_title  = $2`,[branch,jobtype])).rows;
            return employees;
        case 3:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_name = $1 and dept_name = $2 and job_title != $3`,[branch,department,user])).rows;
            return employees;
        case 4:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id) 
            where branch_name = $1 and dept_name = $2 and job_title  = $3 `,[branch,department,jobtype])).rows;
            return employees;
        default:
            console.log(querySelect);
      };
     
  }
  static async getCanbeSupervisors(branch,department,user){
    const result=(await db.query(`
    select employee_id,first_name,last_name from employee join personal_information using(employee_id) 
    where branch_name = $1 and dept_name = $2 and job_title != $3
    and employee_id not in (select distinct(employee_id) from supervisor)`,[branch,department,user])).rows;
    return result;
}
  static async getSupervisorGroup(supervisor_id){
    const supervisor_employees=(await db.query(`
    select employee_id,first_name,last_name from supervisor join personal_information using(employee_id) where supervisor_id = $1`,[supervisor_id])).rows;
    return supervisor_employees;
}

static async getEmployeesToaddSupervisorT(branch,department,user){
    const toAddSupervisor_employees=(await db.query(`
    select employee_id,first_name,last_name from employee join personal_information using(employee_id) 
    where branch_name = $1 and dept_name = $2 and job_title != $3 and supervisor = false
    and employee_id not in (select distinct(employee_id) from supervisor)`,[branch,department,user])).rows;
    return toAddSupervisor_employees;
}

static async saveSupervisor(supervisor_id){
    const result=(await db.query(`
    update employee set supervisor= 'true' where employee_id = $1`,[supervisor_id])).rows;
    return result;
}
static async saveSupervisorGroup(supervisor_id,supervisorGroupemployeeIDs,arraylength){
    console.log(supervisor_id);
    console.log(supervisorGroupemployeeIDs);
    // const result = await db.query(`CALL addToSupervisorT($1,$2)`,[supervisorGroupemployeeIDs, supervisor_id];
    // const parameters=[supervisorGroupemployeeIDs,supervisor_id];
    // console.log(parameters);
    const result=(await db.query(`
    CALL addToSupervisorT($1,$2,$3)`,[supervisorGroupemployeeIDs,supervisor_id,arraylength])).rows;
    return result;
} 
static async getSupervisors(branch,department,user){
    const result=(await db.query(`
    select employee_id,nic,first_name,last_name from personal_information join employee using(employee_id)
    where branch_name = $1 and dept_name = $2 and job_title != $3 and supervisor = true`,[branch,department,user])).rows;
    return result;
}
static async getSupervisor(emp_id){
    const result=(await db.query(`
    select supervisor_id from supervisor where employee_id = $1`,[emp_id])).rows;
    return result;
}
static async SupervisorDelete(emp_id){
    const result=(await db.query(`
    update employee set supervisor= 'false' where employee_id = $1`,[emp_id])).rows;
    return result;
}


}
module.exports=manager;