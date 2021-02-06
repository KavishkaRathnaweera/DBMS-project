const {loginValidator}=require("../validaters/loginValidater")
const {registerValidator}=require("../validaters/registerValidator")
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


        res.render('signup',{
            user:'',
            NIC:'',
            first_name:'',
            middle_name:'',
            last_name:'',
            gender:'',
            birthday:'',
            address_id:'',
            email:'',
            password:'',
            branch_id:'',
            job_title:'',
            dept_name:'',
            paygrade_level:'',
            e_status_name:'',
            error:'',
            success:''

        })
    }

    static async signup(req,res){
        try {
            const {error, value} =await registerValidator.validate(req.body)
            if(error) throw error;
            await userServices.register(value)
            res.redirect('/login?success=admin register sucessfull')

        } catch (error) {
            res.render('signup',{
                user:'',
                NIC:req.body.NIC,
                first_name:req.body.first_name,
                middle_name:req.body.middle_name,
                last_name:req.body.last_name,
                gender:req.body.gender,
                birthday:req.body.birthday,
                address_id:req.body.address_id,
                email:req.body.email,
                password:req.body.password,
                branch_id:req.body.branch_id,
                job_title:req.body.job_title,
                dept_name:req.body.dept_name,
                paygrade_level:req.body.paygrade_level,
                e_status_name:req.body.e_status_name,
                error:error,
                success:""
            })
        }
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