const {loginValidator}=require("../validaters/loginValidater")
const userServices=require('../services/userServices')

class RootController{
    static async indexPage(req,res){
        res.render('index',{
            user:''
        })
    }



    static async loginPage(req,res){
        
        res.render('login', {
            user:'',
            success:req.query.success,
            erorr:req.query.erorr,
            email:'',
            password:''
        })
    }
    static async login(req,res){
        try {
            const {error, value} =await loginValidator.validate(req.body)
            if(error) throw error
            const user=await userServices.login(value);
          
            var type=null;
            if(user.job_title =="HR"){
                type="HR";
            }
            else{
                 type="employee"
            }

            req.session.user={}

            req.session.user.type=type
            req.session.user.uid=user.employee_id
            req.session.user.NIC=user.NIC
            req.session.user.first_name=user.first_name
            req.session.user.middle_name=user.middle_name
            req.session.user.last_name=user.last_name
            req.session.user.email=user.email
            req.session.user.department=user.dept_name
            req.session.user.branch_id=user.branch_id
            req.session.user.job_title=user.job_title

            res.redirect(`/${type}`)
            


        } catch (erorr) {
            res.redirect(`/login?erorr=${erorr}`)
        }
    }


    static async signupPage(req,res){
        res.render('register',{
            user:'',
            NIC:'',
            first_name:'',
            middle_name:'',
            last_name:'',
            address_no:'',
            street:'',
            state:'',
            phone_number:'',
            email:'',
            user_name:'',
            password:'',
            error:''
        })
    }

   
    static async logout(req,res){
        try {
            req.session.destroy();
            res.redirect('/login')
        } catch (error) {
            res.redirect('/login')
            
        }
    }


}

module.exports=RootController