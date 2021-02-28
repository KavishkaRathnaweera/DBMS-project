const Error =require('../helpers/error')
const User=require('../models/user')
const Admin=require('../models/admin')
const bcrypt=require('bcrypt')
const idChecker=require("../helpers/idChecker")

class userServices {
    static async login({id,password}){
        
        const isValidID=idChecker.idChecker(id)
        if(!isValidID){
            throw new Error.BadRequest("EMP ID is not Valid")
        }
        let user= await User.findEmployee(isValidID)

        
        if(!user){
             user=await Admin.findAdmin(isValidID)
            if(!user){
                throw new Error.BadRequest('you dont have permission to login');
            }
            else if(user){
                user.job_title="admin"
            }
            else{
                throw new Error.BadRequest('EMP ID is not registered');
            }
        }
        const isPasswordCorrect =await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
             throw new Error.BadRequest('entered password is wrong');
        }
        return user;
        
    }

    static async register({NIC,first_name, middle_name, last_name, gender, birthday,  address,city, postal_code,country, email, password, branch_name, job_title, dept_name, paygrade_level, e_status_name}){
        const isEmailRegistered=await User.findUserByEmail(email);
        if(isEmailRegistered){
            throw new Error.BadRequest("email is already registered")
        }
        const isNICRegistered=await User.findUserByNIC(NIC);
        if(isNICRegistered){
            throw new Error.BadRequest("NIC is already registered")
        }
        const hashpwd=await bcrypt.hash(password, 10);
        const user=await  User.register(NIC,first_name, middle_name, last_name, gender, birthday,  address,city, postal_code,country, email, hashpwd, branch_name, job_title, dept_name, paygrade_level, e_status_name);
        return user
    }
    
}

module.exports=userServices