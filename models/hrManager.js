const db = require("../connection");
const User=require('../models/user')
const customAttributesModelsHelper=require('../helpers/customAttributesModelsHelper')


class hrManager {

  static async customAttributes(value){
      const {r_bind, r_data}= await customAttributesModelsHelper(value)
      const sql=`insert into personal_information_custom values(${r_bind}) `
      console.log(sql)
      await db.query(sql, r_data)
  }
  static async addEmployee(value) {
    try{
    await db.query("BEGIN")
    console.log(value)
     const addressrow= await User.addressTable(value.address_id,value.city,value.postal_code, value.country);
     const personalDetails =(await db.query(` insert into  personal_information(NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password) values ($1, $2, $3, $4, $5,$6,$7,$8,$9 ) 
                                          returning *`,[value.NIC,value.first_name,value.middle_name,value.last_name,value.gender,value.birthday,addressrow[0].address_id,value.email,value.password]
                                          )).rows[0];

     const employee=(await db.query(`insert into Employee (employee_id ,branch_name, job_title, dept_name, paygrade_level, e_status_name) values($1,$2, $3, $4, $5, $6)
                                          `,[personalDetails.employee_id,value.branch_name,value.jobTitle,value.department,value.payGrade,value.empStatus]));
      
    value.employee_id=personalDetails.employee_id;
    await hrManager.customAttributes(value)

     const empEmergency = (await db.query(`INSERT INTO emergency_contact_details(employee_id,relative_name,contact_no) values($1,$2, $3)
                                          `,[personalDetails.employee_id,value.first_name,value.phone]));
     const empPhone = (await db.query(`INSERT INTO employee_phone_number(employee_id,phone) values($1,$2)
                                          `,[personalDetails.employee_id,value.phone]));
                                          
    await db.query("COMMIT")
    return personalDetails;

    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }   
    }

    static async getEmployees(branch,department,jobtype,payGrade,querySelect,columns){
      var employees;
      var types;
      try {
        switch(querySelect){
        case 1:
          employees=(await db.query(`
          select ${columns} from full_employee_detail `)).rows;
          types=["All types of employees"];
          break;
        case 2:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1`,[payGrade])).rows;
            types = ["Paygrade : "+payGrade];
            break;
        case 3:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where job_title = $1`,[jobtype])).rows;
            types = ["Job Title : " + jobtype];
          break;
        case 4:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where dept_name = $1`,[department])).rows;
             types = ["Department : " + department];
          break;
        case 5:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where branch_name = $1`,[branch])).rows;
            types = ["Branch : " + branch];
          break;
        case 6:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and job_title = $2`,[payGrade,jobtype])).rows;
             types = ["Job Title : " + jobtype, "Pay Grade : "+payGrade];
          break;
        case 7:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and dept_name = $2`,[payGrade,department])).rows;

             types = [ "Department : "+department,"Pay Grade : " + payGrade];
          break;
        case 8:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where dept_name = $1 and job_title = $2`,[department,jobtype])).rows;
      
            types = ["Department : " + department, "Job Title : " + jobtype];
          break;
        case 9:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and branch_name = $2`,[payGrade,branch])).rows;
            columns = ["employee_id,nic,email,first_name,last_name,dept_name,paygrade_level"];
             types = ["Branch : " + branch, "Pay Grade : " + payGrade];
          break;
        case 10:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where branch_name = $1 and job_title = $2`,[branch,jobtype])).rows;
            types = ["Branch : " + branch, "Job Title : " + jobtype];
          break;
        case 11:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where branch_name = $1 and dept_name = $2`,[branch,department])).rows;
          
             types = ["Branch : " + branch, "Department : " + department];
          break;
         case 12:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and dept_name = $2 and job_title = $3`,[payGrade,department,jobtype])).rows;
            
             types = ["Department : " + department, "Job Title : " + jobtype, "Pay Grade : " + payGrade];
          break;
        case 13:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and branch_name = $2 and job_title = $3`,[payGrade,branch,jobtype])).rows;
            types = ["Branch : " + branch, "Job Title : " + jobtype, "Pay Grade : " + payGrade];
          break;
        case 14:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where branch_name = $1 and dept_name = $2 and job_title = $3`,[branch,department,jobtype])).rows;
            types = ["Branch : " + branch, "Department : " + department,"Job Title : " + jobtype];
          break;
        case 15:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and dept_name = $2 and branch_name = $3`,[payGrade,department,branch])).rows;
      
             types = ["Branch : " + branch, "Department : " + department,"Pay Grade : " + payGrade];
          break;
        case 16:
            employees=(await db.query(`
            select ${columns} from full_employee_detail 
            where paygrade_level = $1 and dept_name = $2 and job_title = $3 and  branch_name = $4 `,[payGrade,department,jobtype,branch])).rows;
            types = ["Branch : " + branch, "Department : " + department,"Job Title : " + jobtype,"Pay Grade : " + payGrade];
          break;
      };
      const columnAndDetails = {
        details:employees,
        selectTypes:types
      }
      return columnAndDetails;
      } catch (error) {
        throw error;
      }
      

     
  }

  static async getEmpFields() {
    try{
      const fields=(await db.query(`
            select * from full_employee_detail limit 1`)).rows;
      return fields[0]
    } catch (error) {
      throw error;
    }   
    }

  static async getDepartmentLeaves(startDate,endDate) {
    try{
      const fields=(await db.query(`
            select dept_name, count(leave_id) from (select * from getleavebydate( $1,$2)) as emptable inner join employee using(employee_id) right outer join department using(dept_name) group by dept_name; `,[startDate,endDate])).rows;
      return fields
    } catch (error) {
      throw error;
    }   
    }


  }

  //  select dept_name ,count(leave_id) as total_leaves from leave_record inner join employee using(employee_id) right outer join department using(dept_name) group by dept_name
//select dept_name, count(leave_id) from (select * from getleavebydate('02/10/2021','02/15/2021')) as emptable inner join employee using(employee_id) right outer join department using(dept_name) group by dept_name;
module.exports = hrManager;