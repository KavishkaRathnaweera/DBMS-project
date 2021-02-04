const sql=require('../connection')

class Organization{
    static async getAllBranches(){
            const branches =await sql`
            select branch_id, branch_name from branch`

            return branches;
    }
    static async getHRJobTitle(){
        const [jobTitle] =await sql`
        select job_title from job_type`
        return [jobTitle];
    }
    static async getHRDepartment(){
        const [department]=await sql`
        select dept_name from department` 
        return [department];
    }
    static async getHRPayGradeLevel(){
        const [payGrade]=await sql`
        select paygrade_level from pay_grade` 
        return [payGrade];
    }
    static async getEmployeeStatus(){
        const [employee_status]=await sql`
        select e_status_name from employee_status` 
        return [employee_status];
    }
}
module.exports=Organization;