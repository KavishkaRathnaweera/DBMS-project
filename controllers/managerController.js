const e = require('cors');
const managerServices =require('../services/managerServices');

var user="Manager";
var userBranch="Sri Lanka";
var userBranchID=1;
var userDepartment="Software dept";
var emloyeeData = [];
var editAccess = true;
var checkSupervisorADD = false;
var employeeList = [];
var deptEmployees=[];
var supervisorGroup=[];
var supervisor_id;
var supervisor_name;
var employeeListToAddSupervisor=[];
var searchSupervisorErr=false;
var searchSupervisormsg=[];

class  MnagerController{
        static async dashboard(req,res){//dashboard ekata eddima branch , deptment, define kranna
            res.render('./manager/managerDashboard', {
                
            })
        }
        static async viewData(req,res){
            //render karaddi ywanna ona variables --> employeedata, editaccess(true/false) 
            //false nam--> edit button ekk pennana one. true nam --> save button eka pennanna one
            const id = req.params.id;
            if(!id){
                console.log("ewdwedwed");
            }
            else{
                console.log(id);
                //employee data tika array ekta dala redirect karanwa manager/viewData
                //editAccess--false
            }
           
            res.render('./manager/viewData', {
                emloyeeData:emloyeeData,
                editAccess:editAccess
            })
        }
        // static async editData(req,res){

        //     res.render('./manager/editData', {
                
        //     })
        // }
        static async searchEmployee(req,res){
            //if ekk dala balanna ona manager da hr da access karanne kiyala.
            const branches=await managerServices.getAllBranches();
            const Jobtypes=await managerServices.getAllJobTitles();
            const departments=await managerServices.getAllDepartments();
            res.render('./manager/searchEmployee', {
                user:user,
                userBranch:userBranch,
                userBranchID:userBranchID,
                userDepartment:userDepartment,
                branches:branches,
                departments:departments,
                Jobtypes:Jobtypes,
                employeeList:employeeList
            })
        }
        static async viewEmployee(req,res){
            // employee ge data, post wela ena id eken aragena employee array ekta danna one
            // redirect kranwa manager/viewData route eka
            //editaccess true kranna one
            res.render('./manager/viewData', {
            })
        }
        static async getEmployeeToEdit(req,res){
            res.render('./manager/searchEmployee', {
                
            })
        }

        static async getEmployeeList(req,res){
            var branch = req.body.branchSelect;//if ekk dala balanna ona manager da hr da access karanne kiyala.
            var department = req.body.deptSelect;
            var jobtype = req.body.jobTypeSelect;
            // console.log(branch);
            // console.log(department);
            // console.log(jobtype);
            employeeList= await managerServices.getEmployeeList(branch,department,jobtype,user);
            res.redirect('/manager/search');
        }
        static async applyLeave(req,res){
            res.render('./manager/applyLeave', {
                
            })
        }
        static async viewPersonalDetails(req,res){
            res.render('./manager/viewPersonalData', {
                
            })
        }
        static async addSupervisorView(req,res){
            // employeeList= await managerServices.getEmployeeList(branch,department,jobtype);
            deptEmployees= await managerServices.getEmployeeList(userBranchID,userDepartment,"allJobtypes",user);
          
            res.render('./manager/addSupervisor', {
                checkSupervisorADD:checkSupervisorADD,
                deptEmployees: deptEmployees,
                supervisorGroup:supervisorGroup,
                supervisor_id:supervisor_id,
                supervisor_name:supervisor_name,
                employeeListToAddSupervisor:employeeListToAddSupervisor
            })
        }
        static async viewSupervisor(req,res){
            const supervisorList= await managerServices.getSupervisorList();
            res.render('./manager/viewSupervisor', {
                supervisorList:supervisorList,
                searchSupervisorErr:searchSupervisorErr,
                searchSupervisormsg:searchSupervisormsg
            })
        }
        static async addSupervisor(req,res){
            const selected_supervisor = req.body.selected_supervisor;
            if(selected_supervisor!=''){
                supervisor_id=parseInt(selected_supervisor);
                supervisorGroup=await managerServices.getSupervisorGroup(supervisor_id);
                employeeListToAddSupervisor = await managerServices.getEmployeesToaddSupervisorT(userBranchID,userDepartment,user);//get all employees not in supervisor table
                checkSupervisorADD=true;
            }
            res.redirect('/manager/addSupervisor');
        } 
        static async addMemberToSupervisorGroup(req,res){
           
            const employee_select = req.body.addSuemployee_select;
            var employee_id,employee_name,first_name,last_name;
            // console.log(supervisorGroup);
            [employee_id,employee_name] = employee_select.split(/\s{9}/);
            [first_name,last_name] = employee_name.split(/\s{1}/);
            employee_id = parseInt(employee_id);
            // console.log(employee_id); 
            const findIndex = employeeListToAddSupervisor.findIndex(a => a.employee_id === employee_id);
            findIndex !== -1 && employeeListToAddSupervisor.splice(findIndex , 1);
            supervisorGroup.push({employee_id,first_name,last_name});
            // console.log(supervisorGroup);
            //  console.log(employeeListToAddSupervisor);
            return res.status(200).send({ result: 'redirect', url: '/manager/addSupervisor' });
            // res.redirect('/manager/addSupervisor');

        } 
        static async deleteFromSupervisorGroup(req,res){
            const employee_id = parseInt(req.params.id);
            const findIndex = supervisorGroup.findIndex(a => a.employee_id === employee_id);
            // console.log(employee_id);
            if (findIndex !== -1){
               const employee= supervisorGroup.splice(findIndex , 1);
               employeeListToAddSupervisor.push(employee[0]);
               console.log(employeeListToAddSupervisor);
            }
            res.redirect('/manager/addSupervisor');
        }

        static async saveSupervisorGroup(req,res){
            await managerServices.saveSupervisorGroup(supervisor_id,supervisorGroup);
            checkSupervisorADD=false;
            res.redirect('/manager/addSupervisor');
        }
        static async viewSupervisorsearch(req,res){
            const employee_id = req.body.e_id; 
            const result = await managerServices.findSupervisor(employee_id);
            if(result.count !== 0) {
                const supervisor_id = result[0].supervisor_id;
                searchSupervisormsg.push({employee_id,supervisor_id});
                searchSupervisorErr=false;
            }
            else{
                searchSupervisormsg.pop();
                searchSupervisorErr=true;
            }
            res.redirect('/manager/viewSupervisor');
        }
   
        static async viewSupervisorDelete(req,res){
            try{
                await managerServices.SupervisorDelete(req.body);
                return res.status(200).send({ result: 'redirect', url: '/manager/viewSupervisor' , err:''});
            }catch(err){
                return res.status(200).send({err:err});
            }
          
        }
   
   
    }
module.exports=MnagerController