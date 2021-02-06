const e = require('cors');
const managerServices =require('../services/managerServices');

var emloyeeData = [];
var editAccess = true;
var employeeList = [];
class  MnagerController{
        static async dashboard(req,res){
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
        static async editData(req,res){

            res.render('./manager/editData', {
                
            })
        }
        static async searchEmployee(req,res){
            //if ekk dala balanna ona manager da hr da access karanne kiyala.
            var user="manager";
            var userBranch="Sri Lanka";
            var userBranchID=1;
            const branches=await managerServices.getAllBranches();
            const Jobtypes=await managerServices.getAllJobTitles();
            const departments=await managerServices.getAllDepartments();
            res.render('./manager/searchEmployee', {
                user:user,
                userBranch:userBranch,
                userBranchID:userBranchID,
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
            console.log(branch);
            console.log(department);
            console.log(jobtype);
            employeeList= await managerServices.getEmployeeList(branch,department,jobtype);
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
        
}

module.exports=MnagerController