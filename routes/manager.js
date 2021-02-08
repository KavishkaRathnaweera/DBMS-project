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
router.get('/addSupervisor', managerController.addSupervisorView)
router.get('/viewSupervisor', managerController.viewSupervisor)
router.get('/addSupervisor/delete/:id', managerController.deleteFromSupervisorGroup)


router.post('/viewData', managerController.viewEmployee)
router.post('/searchEmployees', managerController.getEmployeeList)
router.post('/addSupervisor', managerController.addSupervisor)
router.post('/addSupervisor/addMember', managerController.addMemberToSupervisorGroup)
router.post('/addSupervisor/save', managerController.saveSupervisorGroup)
router.post('/viewSupervisor', managerController.viewSupervisorsearch)
router.post('/viewSupervisor/delete', managerController.viewSupervisorDelete)
// router.post('/editData', managerController.getEmployeeToEdit)

module.exports=router