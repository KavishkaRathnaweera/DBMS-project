const sql = require("../connection");

class Supervisor {
  static async getAllLeavingRequests() {
    const id = 180335;
    const no = "No";
    const records = await sql` select * from getleavea(${id}) `;
    console.log(records);
    return records;
  }
  static async findByID(id) {
    const request = await sql`
            select * from leave_record where leave_id = ${id}`;
    return request;
  }

  static async getRemainingLeaves(id) {
    const res = await sql`
            select * from employee_leave WHERE employee_id = ${id} AND year = 2021`;
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

    const res = await sql`
            UPDATE leave_record SET approval_state = ${result} WHERE leave_id = ${leave_id}`;
    return res;
    // const res = await sql`;
    //         select * from employee_leave WHERE employee_id = ${id} AND year = 2021`;
    // return res;
  }

  static async getEmployees() {
    const id = 180335;
    const res = await sql`
            select * from getEmployees(${id})`;
    return res;
  }
}

module.exports = Supervisor;
