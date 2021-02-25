 const db =require('../connection')
const User=require('../models/user')
const customAttributesModelsHelper=require('../helpers/customAttributesModelsHelper')


class admin{
      static async customAttributes(value){
            const {r_bind, r_data}= await customAttributesModelsHelper(value)
            const sql=`insert into personal_information_custom values(${r_bind}) `
            console.log(sql)
             await db.query(sql, r_data)
      }

      static async adminRegister(NIC,first_name, middle_name, last_name,  gender, birthday, address,city, postal_code,country,email, password ,photo){

            
                     try {
                             await db.query("BEGIN")
                             const addressrow= await User.addressTable(address,city,postal_code, country);
                        
                             const personal_information =(await db.query(`
                              insert into Personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password, photo) values ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10 ) 
                              returning *`,[NIC,first_name,middle_name,last_name,gender,birthday,addressrow[0].address_id,email,password, photo]
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



      static async addHR(value){
      
                   try{
                        await db.query("BEGIN")
                        const addressrow= await User.addressTable(value.address,value.city,value.postal_code, value.country);
                        
                        const hr =(await db.query(`
                                          insert into personal_information (NIC, first_name, middle_name, last_name, gender,birth_day, address_id, email, password, photo) values ($1, $2, $3, $4, $5,$6,$7,$8,$9, $10) 
                                          returning *`,[value.NIC,value.first_name,value.middle_name,value.last_name,value.gender,value.birthday,addressrow[0].address_id,value.email,value.password, value.photo]
                                          )).rows[0];
                        value.employee_id=hr.employee_id;
                        await admin.customAttributes(value)

                        const employee=(await db.query(`insert into Employee (employee_id ,branch_name, job_title, dept_name, paygrade_level, e_status_name) values($1,$2, $3, $4, $5, $6)
                                          `,[hr.employee_id,value.branch_name,value.job_title,value.dept_name,value.paygrade_level,value.e_status_name]))

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

      static async addCustomAttribute(name, type, size, default_val){
            var s;
            var dv;
            if(size){
                   s=`(${size})`
            }
            else{
                  s=''
            }

            if(default_val){
                  dv=`default ${default_val}`
            }
            else{
                  dv=''
            }
            const sql=`alter table personal_information_custom add column ${name} ${type}  ${s} ${dv}`
            await db.query(sql)
            await db.query('insert into customattributes(name, type, size, default_val) values ($1, $2, $3, $4)', [name, type, size? size:0, default_val])
            return ;
      }
     


}

module.exports=admin