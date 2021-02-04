const Error =require('../helpers/error')
const Admin=require('../models/admin')
const user=require('../models/user')
const bcrypt=require('bcrypt');
const User = require('../models/user');

class adminServices{
    static async adminRegister({NIC, first_name, middle_name, last_name, gender, birthday, address_id, email, user_name, password, securityKey}){
            
                const isEmailRegistered=await user.findUserByEmail(email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                
                if(securityKey != process.env.SECRET){
                    throw new Error.Unauthorized("provided security key is invalid")
                }
              
                const hashpwd= await bcrypt.hash(password, 10)

                const admin=await Admin.adminRegister(NIC, first_name, middle_name, last_name, gender, birthday, address_id, email, user_name, hashpwd)
                return admin;
    }

    static async addHR({NIC,first_name, middle_name, last_name, gender, birthday, address_id, email, password, branch_id, job_title, dept_name, paygrade_level, e_status_name}){
                const isEmailRegistered=await user.findUserByEmail(email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                const isNICRegistered=await User.findUserByNIC(NIC);
                if(isNICRegistered){
                    throw new Error.BadRequest("NIC is already registered")
                }
                const hashpwd=await bcrypt.hash(password, 10);
                const HR=await  Admin.addHR(NIC,first_name, middle_name, last_name, gender, birthday, address_id, email, hashpwd, branch_id, job_title, dept_name, paygrade_level, e_status_name);
                return HR
    }
    



    
    
}
module.exports=adminServices