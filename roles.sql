-- admin role

CREATE ROLE admin WITH LOGIN PASSWORD 'passwordAdmin';
Grant select,insert on personal_information to admin;
Grant select,insert on employee to admin;
Grant select,insert,delete on personal_information_custom to admin;
Grant select,insert,delete on customattributes to admin;
Grant select,insert,update on branch to admin;
Grant select,insert,update on address to admin;
Grant select,insert,update on city to admin;
Grant select,insert,update on country to admin;
Grant select,insert,update on job_type to admin;
Grant select,insert,update on pay_grade to admin;
Grant select,insert,update on department to admin;
Grant select,insert,update on employee_status to admin;
Grant select,update on leave to admin;
Grant select on information_schema.columns to admin;
GRANT EXECUTE ON PROCEDURE updatejupitorleaves(paygradelevel character varying, an integer, cas integer, mat integer, nopay integer) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorbranch(branchname character varying, add integer) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitoremployeestatus(estatusname character varying, du character varying, des character varying) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorjobs(jobtitle character varying, des character varying, req character varying, prereq character varying) TO admin;
GRANT EXECUTE ON PROCEDURE updatejupitorpaygrade(paygradelevel character varying, des character varying, req character varying) TO admin;
GRANT EXECUTE ON FUNCTION setaddress(addressname character varying, cityid numeric, postalcode numeric) TO admin;
GRANT EXECUTE ON FUNCTION setcity(cityname character varying, countryid numeric) TO admin;
GRANT EXECUTE ON FUNCTION setcountry(c character varying) TO admin;

ALTER TABLE personal_information_custom
    OWNER TO admin;




-- hr role

CREATE ROLE jupitorhr WITH LOGIN PASSWORD 'passwordjupitorhr';
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE address TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE branch TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE city TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE country TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE customattributes TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE department TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE employee TO jupitorhr;
GRANT UPDATE, INSERT, SELECT, TRIGGER ON TABLE employee_phone_number TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE employee_status TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE job_type TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE leave TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE leave_record TO jupitorhr;
GRANT SELECT, TRIGGER ON TABLE pay_grade TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information TO jupitorhr;
GRANT ALL ON TABLE session TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE supervisor TO jupitorhr;
GRANT ALL ON SEQUENCE address_address_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE city_city_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE country_country_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitorhr;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information_custom TO jupitorhr;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE full_employee_detail TO jupitorhr;
GRANT EXECUTE ON FUNCTION changeempcount() TO jupitorhr;
GRANT EXECUTE ON FUNCTION changeempcount1() TO jupitorhr;
GRANT EXECUTE ON FUNCTION emp_leave() TO jupitorhr;
GRANT EXECUTE ON FUNCTION emp_stamp() TO jupitorhr;
GRANT EXECUTE ON FUNCTION updatesupervisortable() TO jupitorhr;
GRANT EXECUTE ON FUNCTION getleavebydate(date, date) TO jupitorhr;

-- Supervisor Role --------------
CREATE ROLE jupitorSupervisor WITH LOGIN PASSWORD 'password123';
GRANT  SELECT  ON TABLE personal_information TO jupitorSupervisor;
GRANT  SELECT  ON TABLE supervisor TO jupitorSupervisor;
GRANT  SELECT,UPDATE, TRIGGER ON TABLE leave_record TO jupitorSupervisor;
GRANT  SELECT ON TABLE employee_leave TO jupitorSupervisor;
GRANT  SELECT ON TABLE leave TO jupitorSupervisor;
GRANT  SELECT ON TABLE employee TO jupitorSupervisor;
GRANT ALL ON TABLE session TO jupitorSupervisor;

GRANT EXECUTE ON FUNCTION getAttendence(s_id numeric, today date ) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getEmployee(e_id numeric) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getEmployees1(s_id numeric) TO jupitorSupervisor;
GRANT EXECUTE ON FUNCTION getleavea(s_id numeric) TO jupitorSupervisor;

