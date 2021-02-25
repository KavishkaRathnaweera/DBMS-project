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
          select employee_id,nic,first_name,last_name from EmployeeData_View
          where branch_name = $1 and job_title != $2`,[branch,user])).rows;
          return employees;
        case 2:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View 
            where branch_name = $1 and job_title  = $2`,[branch,jobtype])).rows;
            return employees;
        case 3:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View
            where branch_name = $1 and dept_name = $2 and job_title != $3`,[branch,department,user])).rows;
            return employees;
        case 4:
            employees=(await db.query(`
            select employee_id,nic,first_name,last_name from EmployeeData_View
            where branch_name = $1 and dept_name = $2 and job_title  = $3 `,[branch,department,jobtype])).rows;
            return employees;
        default:
            console.log(querySelect);
      };
     
  }
  static async getCanbeSupervisors(branch,department,user){
    const result=(await db.query(`
    select employee_id,first_name,last_name from EmployeeData_View 
    where branch_name = $1 and dept_name = $2 and job_title != $3
    and employee_id not in (select distinct(employee_id) from supervisor)`,[branch,department,user])).rows;
    return result;
}
  static async getSupervisorGroup(supervisor_id){
    const supervisor_employees=(await db.query(`
    select employee_id,first_name,last_name from supervisor join personal_information using(employee_id) 
    where supervisor_id = $1`,[supervisor_id])).rows;
    return supervisor_employees;
}

static async getEmployeesToaddSupervisorT(branch,department,user){
    const toAddSupervisor_employees=(await db.query(`
    select employee_id,first_name,last_name from EmployeeData_View
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
    select employee_id,nic,first_name,last_name from EmployeeData_View
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

// -----------------------------view data edit data -----------------------
static async getAllPayGradeLevel(){
    const payGrade=await db.query(`
    select paygrade_level from pay_grade `)
    return payGrade.rows;
}
static async getEmployeeStatus(){
    const employee_status=await db.query(`
    select e_status_name from employee_status`)
    return employee_status.rows;
}
static async getEmployeeBranchAndDeptAndjobTitle(id){
    const result=await db.query(`
    select branch_name,dept_name,job_title from employee where employee_id = $1`,[id])
    return result.rows;
}
static async getEmpDATA(id){
    const result=await db.query(`
    select * from EmployeeData_View left outer join employee_phone_number using(employee_id) join address using(address_id) join city using(city_id) 
    where employee_id = $1`,[id])
    return result.rows;
}

static async findUserIDByEmail(email){
    const result=await db.query(`
    select employee_id from personal_information where email = $1`,[email])
    return result.rows;
}
static async findUserIDByNIC(NIC){
    const result=await db.query(`
    select employee_id from personal_information where NIC = $1`,[NIC])
    return result.rows;
}
static async updateEmployee(value) {
  
   console.log(value)
    try{//assume if address name is same then city and postal code also same
        await db.query("BEGIN");
        let addressID = (await db.query(`SELECT address_id from address where address = $1`,[value.adress_id])).rows;
        // console.log(addressID);
        if(!addressID[0]){
            let cityID=(await db.query(`SELECT city_id from city where city.city= $1`,[value.city])).rows;
            if(!cityID[0]){
                // console.log(branch);
                // console.log(cityID[0]);
                const countryId = (await db.query(`SELECT country_id from branch inner join address using(address_id) inner join city using(city_id) 
                where branch_name= $1`,[value.branch])).rows;
                // console.log(countryId);
                cityID = (await db.query(`INSERT INTO city(city,country_id) VALUES($1,$2) returning city_id`,[value.city,countryId[0].country_id])).rows;
                // console.log(cityID[0]);
               
            }
            addressID = (await db.query(`INSERT INTO address(address,city_id,postal_code) VALUES($1,$2,$3) returning address_id`,[value.address_id,cityID[0].city_id,value.postal_code])).rows;
        }

        const personal_information = (await db.query(`update Personal_information set NIC = $1, first_name=$2, middle_name=$3, last_name=$4, gender=$5, birth_day=$6, address_id=$7, email=$8, password=$9 
        where employee_id = $10`,[value.NIC, value.first_name, value.middle_name, value.last_name, value.gender, value.birthday, addressID[0].address_id,  value.email, value.password,value.ID])).rows;

        const employee = (await db.query(`update Employee set branch_name=$1, job_title=$2, dept_name=$3, paygrade_level=$4, e_status_name=$5 
        where employee_id=$6`,[value.branch, value.jobTitle, value.department, value.payGrade, value.empStatus, value.ID])).rows;

        const empEmergency = (await db.query(`UPDATE emergency_contact_details set relative_name=$1, contact_no=$2 
        where employee_id=$3`,[value.first_name, value.phone,value.ID])).rows;
        const empPhone = (await db.query(`UPDATE employee_phone_number set phone=$1 
        where employee_id=$2`,[value.phone,value.ID])).rows;
        await db.query("COMMIT");

        } catch (error) {
              await db.query("ROLLBACK");
              throw error
        }   



  }

}
module.exports=manager;