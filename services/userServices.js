const Error =require('../helpers/error')
const User=require('../models/user')
const bcrypt=require('bcrypt')
const idChecker=require("../helpers/idChecker")

class userServices {
    static async login({id,password}){
        
        const isValidID=idChecker.idChecker(id)
        if(!isValidID){
            throw new Error.BadRequest("EMP ID is not Valid")
        }


        const user= await User.findEmployee(isValidID)
        if(!user){
            throw new Error.BadRequest('EMP ID is not registered');
        }
        const isPasswordCorrect =await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
             throw new Error.BadRequest('entered password is wrong');
         }
        return user;
        
    }
    
}

module.exports=userServices