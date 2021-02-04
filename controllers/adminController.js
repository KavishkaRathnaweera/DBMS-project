const {adminRegisterValidator, addHRvalidator} =require('../validaters/registerValidator')
const {adminLoginValidator} =require('../validaters/loginValidater')
const adminServices =require('../services/adminServices');
const userServices = require('../services/userServices');
const idForm=require("../helpers/idChecker")
const OrganizationServices=require('../services/organizationServices')

class  AdminController{

        static async signupPage(req,res){
            res.render('admin/adminSignup',{
                    NIC:'',
                    first_name:'',
                    middle_name:'',
                    last_name:'',
                    gender:'',
                    birthday:'',
                    address_id:'',
                    email:'',
                    password:'',
                    error:'',
                    user:""
                
            })
        }

        static async signup(req,res){
            try {
                const {error, value} =await adminRegisterValidator.validate(req.body)
                if(error) throw error;
                await adminServices.adminRegister(value)
                res.redirect('/admin/login?success=admin register sucessfull')

            } catch (error) {
                res.render('admin/adminSignup',{
                    NIC:req.body.NIC,
                    first_name:req.body.first_name,
                    middle_name:req.body.middle_name,
                    last_name:req.body.last_name,
                    gender:req.body.gender,
                    birthday:req.body.birthday,
                    address_id:req.body.address_id,
                    email:req.body.email,
                    password:req.body.password,
                    error:error,
                    user:""
                })
            }
        }
        static async loginPage(req,res){
            res.render('admin/adminLogin',{
                error:req.query.error? req.query.error:"",
                userName:"",
                password:"",
                user:'',
                success:req.query.success?req.query.success:"" 
            })
        }
        static async login(req,res){
            try{
                    const {error, value}= await adminLoginValidator.validate(req.body)
                    if(error) throw error;
                    const admin=await userServices.login(value)
                    req.session.user={}
                    req.session.user.type='admin'
                    req.session.user.uid=admin.employee_id,
                    req.session.user.NIC=admin.NIC,
                    req.session.user.first_name=admin.first_name,
                    req.session.user.middle_name=admin.middle_name,
                    req.session.user.last_name=admin.last_name,
                    req.session.user.email=admin.email

                    res.redirect('/admin/home?success=admin login successfull')




            }catch(error){
                    res.render('admin/adminLogin',{
                        error:error,
                        username: req.body.user_name,
                        password:req.body.password,
                        user:'',
                        success:''
                    })
            }
        }


        

        static async home(req,res){
            res.render('admin/adminHome', {
                user:req.session.user,
                error:req.query.error,
                success:req.query.success
            })
        }

        static async addHRPage(req,res){
            try {
                const branches=await OrganizationServices.getAllBranches()
                const Jobtypes=await OrganizationServices.getHRJobTitle()
                const departments=await OrganizationServices.getHRDepartment();
                const payGrades=await OrganizationServices.getHRPayGradeLevel()
                const employee_statuses=await OrganizationServices.getEmployeeStatus();
                const HR={}
                HR.NIC=req.query.NIC
                HR.first_name=req.query.first_name
                HR.middle_name=req.query.middle_name
                HR.last_name=req.query.last_name
                HR.gender=req.query.gender
                HR.birthday=req.query.birthday
                HR.address_id=req.query.address_id
                HR.email=req.query.email,
                HR.password=req.query.password
                HR.branch_id=req.query.branch_id
                HR.job_title=req.query.job_title
                HR.dept_name=req.query.dept_name
                HR.paygrade_level=req.query.paygrade_level
                HR.e_status_name=req.query.e_status_name



                res.render('admin/addHR',{
                    user:req.session.user,
                    error:req.query.error,
                    success:req.query.success,
                    branches:branches,
                    Jobtypes:Jobtypes,
                    departments:departments,
                    payGrades:payGrades,
                    employee_statuses:employee_statuses,
                    HR:HR
                })
            } catch (error) {
                res.render('admin/addHR',{
                    user:req.session.user,
                    error:error,
                    success:"",
                    HR:{}
                    
                })
            }

                
        }
        static async addHR(req,res){
            try {
                const {error , value}= await addHRvalidator.validate(req.body)
                if(error) throw error
                const HR =await adminServices.addHR(value); 
                
                const success="HR addedd sucessfully. you can logged in using emp"+idForm.idForm(HR.employee_id);


                
                res.redirect(`/admin/addHR?success=${success}&NIC=${req.body.NIC}&first_name=${req.body.first_name}&
                middle_name=${req.body.middle_name}&last_name=${req.body.last_name}&gender=${req.body.gender}&birthday=${req.body.birthday}&
                address_id=${req.body.address_id}&email=${req.body.email}&password=${req.body.password}&branch_id=${req.body.branch_id}&job_title=${req.body.job_title}&
                dept_name=${req.body.dept_name}&paygrade_level=${req.body.paygrade_level}&e_status_name=${req.body.e_status_name}`)

            } catch (error) {
                res.redirect(`/admin/addHR?error=${error}&NIC=${req.body.NIC}&first_name=${req.body.first_name}&
                middle_name=${req.body.middle_name}&last_name=${req.body.last_name}&gender=${req.body.gender}&birthday=${req.body.birthday}&
                address_id=${req.body.address_id}&email=${req.body.email}&password=${req.body.password}&branch_id=${req.body.branch_id}&job_title=${req.body.job_title}&
                dept_name=${req.body.dept_name}&paygrade_level=${req.body.paygrade_level}&e_status_name=${req.body.e_status_name}`)
            }
        }



}

module.exports=AdminController