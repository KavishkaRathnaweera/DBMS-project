const sql = require("../connection");

class hrManager {
  static async addEmployee(
    NIC,
    email,
    first_name,
    middle_name,
    last_name,
    phone,
    gender,
    birthday,
    address_id, //this is address name,not address id
    city,
    postal_code,
    hashpwd,
    branch,
    jobTitle,
    department,
    payGrade,
    empStatus,
    salary
  ) {
    const HR = await sql.begin(async (sql) => {
      let [cityID] = await sql`SELECT city_id from city where city.city=${city}`;
      if(!cityID){
          const [countryId] = await sql`SELECT country_id from branch inner join address using(address_id) inner join city using(city_id) where branch_id=${branch}`;
          [cityID] = await sql`INSERT INTO city(city,country_id) VALUES(${city},${countryId.country_id}) returning *`;
      }
      
      const [empAddress] = await sql`INSERT INTO address(adress,city_id,postal_code) VALUES(${address_id},${cityID.city_id},${postal_code}) returning address_id`;
      const [personal_information] = await sql`insert into Personal_information (NIC, first_name, middle_name, last_name, gender, birth_day ,address_id, email, password) values (${NIC}, ${first_name}, ${middle_name}, ${last_name}, ${gender}, ${birthday}, ${empAddress.address_id},  ${email}, ${hashpwd}) returning *`;

      const [employee] = await sql`insert into Employee (employee_id ,branch_id, job_title, dept_name, paygrade_level, e_status_name) values(${personal_information.employee_id},${branch}, ${jobTitle}, ${department}, ${payGrade}, ${empStatus}) `;

      const empEmergency = await sql`INSERT INTO emergency_contact_details(employee_id,relative_name,contact_no) values(${personal_information.employee_id},${first_name}, ${phone})`;
      const empPhone = await sql`INSERT INTO employee_phone_number(employee_id,phone) values(${personal_information.employee_id},${phone})`;
      
      return personal_information;
    });
    return HR;
  }
}

module.exports = hrManager;