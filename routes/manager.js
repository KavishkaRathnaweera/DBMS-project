const express=require('express')
const router=express.Router()
const managerController=require("../controllers/managerController.js")



router.get('/', managerController.dashboard)


router.get('/viewData', managerController.viewData)
// router.get('/editData', managerController.editData)
router.get('/search', managerController.searchEmployee)
router.get('/viewData/:id', managerController.viewData)
// router.get('/editData/:id', managerController.editData)
router.get('/viewPersonalDetails', managerController.viewPersonalDetails)
router.get('/applyLeave', managerController.applyLeave)


router.post('/viewData', managerController.viewEmployee)
router.post('/searchEmployees', managerController.getEmployeeList)
// router.post('/editData', managerController.getEmployeeToEdit)
 
module.exports=router