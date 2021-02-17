const Error =require('../helpers/error')
const Admin=require('../models/admin')
const bcrypt=require('bcrypt');
const idChecker=require("../helpers/idChecker")
const User = require('../models/user');

class adminServices{

    static async adminLogin({id,password}){
        
        const isValidID=idChecker.idChecker(id)
        if(!isValidID){
            throw new Error.BadRequest("EMP ID is not Valid")
        }


        const user= await User.findUser(isValidID)
        if(!user){
            throw new Error.BadRequest('EMP ID is not registered');
        }
        const admin=await Admin.findAdmin(isValidID)
        if(!admin){
            throw new Error.BadRequest('you dont have permission to login');
        }


        const isPasswordCorrect =await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
             throw new Error.BadRequest('entered password is wrong');
         }
        return user;
        
    }



    static async adminRegister({NIC, first_name, middle_name, last_name, gender, birthday, address,city, postal_code,country, email,password, photo, securityKey}){
            
                const isEmailRegistered=await User.findUserByEmail(email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                
                if(securityKey != process.env.SECRET){
                    throw new Error.Unauthorized("provided security key is invalid")
                }
              
                const hashpwd= await bcrypt.hash(password, 10)
        
                const admin=await Admin.adminRegister(NIC, first_name, middle_name, last_name, gender, birthday, address,city, postal_code,country, email,  hashpwd, photo)
                return admin;
    }

    static async addHR(value){
                const isEmailRegistered=await User.findUserByEmail(value.email);
                if(isEmailRegistered){
                    throw new Error.BadRequest("email is already registered")
                }
                const isNICRegistered=await User.findUserByNIC(value.NIC);
                if(isNICRegistered){
                    throw new Error.BadRequest("NIC is already registered")
                }
                const hashpwd=await bcrypt.hash(value.password, 10);
                value.password=hashpwd
                const HR=await  Admin.addHR(value);
                return HR
    }

    static async addCustomAttribute({ name, type, size, default_val }) {
        await Admin.addCustomAttribute(name, type, size, default_val)
    }  
              



    
    
}
module.exports=adminServices