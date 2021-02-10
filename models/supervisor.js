const db= require("../connection");

class Supervisor {
  static async getAllLeavingRequests() {
    const id = 180335;
    const no = "No";
    const records =( await db.query(` select * from getleavea($1) `,[id])).rows;
    console.log(records);
    return records;
  }
  static async findByID(id) {
    const request =( await db.query(`
            select * from leave_record where leave_id = $1`,[id])).rows;
    return request;
  }

  static async getRemainingLeaves(id) {
    const res =( await db.query(`
            select * from employee_leave WHERE employee_id = $1 AND year = 2021`,[id])).rows;
    return res;
  }

  static async approveLeave({ leave_id, approved }) {
    const result = "Yes";
    if (approved == null) {
      const result = "Ignored";
      console.log("approved");
    }

    console.log(leave_id);
    console.log(approved);

    const res = (await db.query(`
            UPDATE leave_record SET approval_state = $1 WHERE leave_id = $2`,[result,leave_id])).rows;
    return res;
    // const res = await db.query(`;
    //         select * from employee_leave WHERE employee_id = ${id} AND year = 2021`;
    // return res;
  }

  static async getEmployees() {
    const id = 180335;
    const res =( await db.query(`
            select * from getEmployees($1)`,[id])).rows;
    return res;
  }
}

module.exports = Supervisor;
