const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController");

router.get("/", supervisorController.supervisor);
router.use("/employee", supervisorController.employee);
router.use("/attendence", supervisorController.attendence);
router.use("/leaves", supervisorController.leaves);
router.use("/leaveRequest/:request", supervisorController.leaveRequest);

module.exports = router;
