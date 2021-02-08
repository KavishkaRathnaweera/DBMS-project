const db=require('../connection')
const User=require('../models/user')

class Organization{
    static async getAllBranches(){
            const branches =await db.query(`
            select branch_name from branch`)

            return branches.rows;
    }
    static async getAllJobTitle(){
        const jobTitle=await db.query(`
        select job_title from job_type`)
        return jobTitle.rows;
    }
    static async getAllDepartment(){
        const department=await db.query(`
        select dept_name from department`) 
        return department.rows;
    }
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
    static async getLeaves(){
        
        const leaves=await db.query(`
        select pay_grade.paygrade_level, leave.anual, leave.casual, leave.maternity, leave.no_pay from pay_grade left outer join leave using(paygrade_level)`)
        return leaves.rows;
    }
    static async getLeave(paygrade_level){
        const leave=await db.query(`
        select * from leave where paygrade_level=$1`,[paygrade_level])
        
        return leave.rows[0]

    }
    static async setLeave(paygrade_level,anual, casual, maternity, no_pay){
        
        return  (await db.query(`call updateJupitorLeaves($1 ,$2, $3, $4 ,$5 )`,[paygrade_level,anual,casual,maternity,no_pay])).rows
    }
    static async getAllBranchesWithAddress(){
        return (await db.query(`select * from branch left outer join address using(address_id) left outer join city using(city_id) left outer join country using(country_id)`)).rows
    }

    static async addBranch(branch_name, address, city, postal_code, country){
        const addressrow=await User.addressTable(address,city,postal_code, country);
        return await db.query(`insert into branch values($1, $2)`,[branch_name,addressrow[0].address_id])
    }
}
module.exports=Organization;