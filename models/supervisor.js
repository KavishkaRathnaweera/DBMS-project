const sql = require("../connection");

class Supervisor {
  static async getAllLeavingRequests() {
    const id = 180335;
    const no = "No";
    const records = await sql`
	select l.leave_id,l.employee_id,p.first_name,p.last_name,l.leave_type from supervisor s left outer join leave_record  l on l.employee_id = s.employee_id
	left outer join personal_information p on s.employee_id = p.employee_id
	where s.supervisor_id = ${id} AND l.approval_state = ${no} `;
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
}

module.exports = Supervisor;
