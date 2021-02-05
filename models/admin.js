const sql =require('../connection')

class admin{



        static async adminRegister(NIC,first_name, middle_name, last_name,  gender, birthday, address_id,email, password){
                    
                    const [personal_information]= await sql.begin(async sql=>{
                          const [personal_information] =await sql`
                          insert into Personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password) values (${NIC}, ${first_name}, ${middle_name}, ${last_name}, ${gender},${birthday}  ,${address_id},  ${email},  ${password} ) 
                          returning *`

                          const [admin]=await sql`
                          insert into admin (employee_id) values(${personal_information.employee_id})
                          returning *`

                          return [personal_information]
                    })
                    return personal_information
                     
      }



      static async addHR(NIC,first_name, middle_name, last_name, gender, birthday, address_id, email, password, branch_id, job_title, dept_name, paygrade_level, e_status_name){
      
        const [HR] =await sql.begin(async sql=>{
          const [personal_information] =await sql`
                          insert into Personal_information (NIC, first_name, middle_name, last_name, gender, birth_day ,address_id, email, password) values (${NIC}, ${first_name}, ${middle_name}, ${last_name}, ${gender}, ${birthday}, ${address_id},  ${email}, ${password}) 
                          returning *`
          const [employee]=await sql`
                          insert into Employee (employee_id ,branch_id, job_title, dept_name, paygrade_level, e_status_name) values(${personal_information.employee_id},${branch_id}, ${job_title}, ${dept_name}, ${paygrade_level}, ${e_status_name})
                          `
          return [personal_information];
         })
            return HR;
  
      }
      static async findAdmin(id){
            const [admin]=await sql`
            select * from admin where employee_id=${id}`

            return admin;
      }
     


}

module.exports=admin