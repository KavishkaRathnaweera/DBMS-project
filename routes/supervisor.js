const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController");

router.get("/", supervisorController.supervisor);
router.get("/employee", supervisorController.employee);
router.get("/attendence", supervisorController.attendence);
router.get("/leaves", supervisorController.leaves);
router.get("/leaveRequest/:request", supervisorController.leaveRequest);

router.post("/approve", supervisorController.approve);

module.exports = router;
