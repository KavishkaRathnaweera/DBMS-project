const db =require('../connection')
const User=require('../models/user')

class admin{
      static async adminRegister(NIC,first_name, middle_name, last_name,  gender, birthday, address,city, postal_code,country,email, password){
                     try {
                             await db.query("BEGIN")
                             const addressrow= await User.addressTable(address,city,postal_code, country);
                        
                             const personal_information =(await db.query(`
                              insert into Personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password) values ($1, $2, $3, $4, $5,$6,$7,$8,$9 ) 
                              returning *`,[NIC,first_name,middle_name,last_name,gender,birthday,addressrow[0].address_id,email,password]
                              )).rows[0];
                             
                             const admin=(await db.query(`
                              insert into admin (employee_id) values($1)
                              returning *`,[personal_information.employee_id]
                              )).rows[0];

                            await db.query("COMMIT")
                            return personal_information

                        } catch (error) {
                              await db.query("ROLLBACK")
                              throw error
                        }                     
                     }



      static async addHR(NIC,first_name, middle_name, last_name, gender, birthday, address, city , postal_code,country, email, password, branch_name, job_title, dept_name, paygrade_level, e_status_name){
      
                   try{
                        await db.query("BEGIN")
                        const addressrow= await User.addressTable(address,city,postal_code, country);
                        
                        const hr =(await db.query(`
                                          insert into hr (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password) values ($1, $2, $3, $4, $5,$6,$7,$8,$9 ) 
                                          returning *`,[NIC,first_name,middle_name,last_name,gender,birthday,addressrow[0].address_id,email,password]
                                          )).rows[0];

                        const employee=(await db.query(`insert into Employee (employee_id ,branch_name, job_title, dept_name, paygrade_level, e_status_name) values($1,$2, $3, $4, $5, $6)
                                          `,[hr.employee_id,branch_name,job_title,dept_name,paygrade_level,e_status_name]))

                                          await db.query("COMMIT")
                                          return hr

                        } catch (error) {
                              await db.query("ROLLBACK")
                              throw error
                        }   
                   }





      static async findAdmin(id){
            const admin=await db.query("select * from admin where employee_id=$1",[id])
            return admin.rows[0];
      }
     


}

module.exports=admin