const express=require('express')
const router=express.Router()
const adminContoller=require("../controllers/adminController")
const ifLoggedIn=require("../middleware/ifLoggedIn")
const ifNotLoggedIn=require("../middleware/ifNotLoggedIn")
const ifAdmin=require("../middleware/ifAdmin")
const RootController = require('../controllers/rootController')


router.get('/login', ifLoggedIn, adminContoller.loginPage)
router.get('/home', ifNotLoggedIn, ifAdmin, adminContoller.home)
router.get('/signup', ifLoggedIn,adminContoller.signupPage)
router.get('/addHR',ifNotLoggedIn, ifAdmin, adminContoller.addHRPage)
router.get('/jupitorLeaves',  adminContoller.viewLeaves)
router.get('/editLeave/:paygrade_level', adminContoller.editLeavePage)
router.get('/jupitorBranches', adminContoller.viewBranches);
router.get('/addCustomAttribute',adminContoller.addCustomAttributePage)
router.get('/viewCustomAttributes', adminContoller.viewCustomAttributes)
router.get('/deleteCustomAttribute/:columnName', adminContoller.deleteCustomAttribute)
router.get('/jupitorPayGrades', adminContoller.payGradePage)
router.get('/editPaygrade/:paygrade_level', adminContoller.editPayGradePage)
router.get('/jupitorEmployeeStatus', adminContoller.employeeStatusPage)
router.get('/editEmployeeStatus/:EmployeeStatus', adminContoller.editEmployeeStatusPage)
router.get('/editJobType/:jobType',adminContoller.editJobTypePage)
router.get('/jupitorJobs', adminContoller.jobTypePage)
router.get('/branch/:branch', adminContoller.getBranch)
router.get('/dashboard', adminContoller.dashboard)
router.get('/logout',ifNotLoggedIn, ifAdmin, RootController.logout)



router.post('/login',ifLoggedIn, adminContoller.login)
router.post('/addHR', ifNotLoggedIn, ifAdmin, adminContoller.addHR)
router.post('/addBranch', adminContoller.addBranch)
router.post('/editLeave/:paygrade_level', adminContoller.editLeave)
router.post('/addCustomAttribute',adminContoller.addCustomAttribute)
router.post('/addPayGrade', adminContoller.addPayGrade)
router.post('/editPaygrade/:paygrade_level', adminContoller.editPayGrade)
router.post('/addEmployeeStatus', adminContoller.addEmployeeStatus)
router.post('/editEmployeeStatus/:EmployeeStatus', adminContoller.editEmployeeStatus)
router.post('/addJobType', adminContoller.addJobType)
router.post('/editJobType/:jobType', adminContoller.editJobType)
router.post('/signup', ifLoggedIn, adminContoller.signup)


module.exports=router