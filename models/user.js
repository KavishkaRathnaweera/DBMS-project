const sql = require('../connection');
const con=require('../connection');
const { use } = require('../routes');


class User{
    
    
    static async findUser(id){
            
            const [user] =await sql`
            select * from personal_information where employee_id = ${id}`
            return user;
           
    }


    static async findUserByNIC(NIC){

            const [user] =await sql`
            select * from personal_information where NIC= ${NIC}`
            return user;
   
      }

      static async findUserByEmail(email){
            const [user] =await sql`
            select * from personal_information where email= ${email}`
            return user

      }
      static async findEmployee(id){
            const [user] =await sql`
            select * from personal_information left outer join employee using(employee_id) where employee_id = ${id}`
            return user;
      }

      static async register(NIC,first_name, middle_name, last_name, gender, birthday, address_id, email, password, branch_id, job_title, dept_name, paygrade_level, e_status_name){
      
            const [user] =await sql.begin(async sql=>{
              const [personal_information] =await sql`
                              insert into Personal_information (NIC, first_name, middle_name, last_name, gender, birth_day ,address_id, email, password) values (${NIC}, ${first_name}, ${middle_name}, ${last_name}, ${gender}, ${birthday}, ${address_id},  ${email}, ${password}) 
                              returning *`
              const [employee]=await sql`
                              insert into Employee (employee_id ,branch_id, job_title, dept_name, paygrade_level, e_status_name) values(${personal_information.employee_id},${branch_id}, ${job_title}, ${dept_name}, ${paygrade_level}, ${e_status_name})
                              `
              return [personal_information];
             })
                return user;
      
          }




}

module.exports=User