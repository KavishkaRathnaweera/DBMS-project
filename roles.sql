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
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE address TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE branch TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE city TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE country TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE customattributes TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE department TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE employee TO jupitor2;
GRANT UPDATE, INSERT, SELECT, TRIGGER ON TABLE employee_phone_number TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE employee_status TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE job_type TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE leave TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE leave_record TO jupitor2;
GRANT SELECT, TRIGGER ON TABLE pay_grade TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information TO jupitor2;
GRANT ALL ON TABLE session TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE supervisor TO jupitor2;
GRANT ALL ON SEQUENCE address_address_id_seq TO jupitor2;
GRANT ALL ON SEQUENCE city_city_id_seq TO jupitor2;
GRANT ALL ON SEQUENCE country_country_id_seq TO jupitor2;
GRANT ALL ON SEQUENCE leave_record_leave_id_seq TO jupitor2;
GRANT ALL ON SEQUENCE personal_information_employee_id_seq TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE personal_information_custom TO jupitor2;
GRANT INSERT, SELECT, UPDATE, TRIGGER ON TABLE full_employee_detail TO jupitor2;
GRANT EXECUTE ON FUNCTION changeempcount() TO jupitor2;
GRANT EXECUTE ON FUNCTION changeempcount1() TO jupitor2;
GRANT EXECUTE ON FUNCTION emp_leave() TO jupitor2;
GRANT EXECUTE ON FUNCTION emp_stamp() TO jupitor2;
GRANT EXECUTE ON FUNCTION updatesupervisortable() TO jupitor2;
GRANT EXECUTE ON FUNCTION getleavebydate(date, date) TO jupitor2;

-------------------- role manager----------------------------------------------------------------------------------------
CREATE ROLE jupitormanager WITH LOGIN PASSWORD 'passwordmanager';
GRANT SELECT ON TABLE public.branch TO jupitormanager;
GRANT SELECT ON TABLE public.job_type TO jupitormanager;
GRANT SELECT ON TABLE public.department TO jupitormanager;
GRANT SELECT ON TABLE public.customattributes TO jupitormanager;
GRANT SELECT ON TABLE public.EmployeeData_View TO jupitormanager;
GRANT SELECT ON TABLE public.pay_grade TO jupitormanager;
GRANT SELECT ON TABLE public.employee_status TO jupitormanager;
GRANT SELECT, UPDATE ON TABLE public.personal_information TO jupitormanager;
GRANT SELECT, UPDATE ON TABLE public.personal_information_custom TO jupitormanager;
GRANT SELECT, UPDATE, TRIGGER ON TABLE public.employee TO jupitormanager;
GRANT SELECT, INSERT ON TABLE public.city TO jupitormanager;
GRANT SELECT, INSERT ON TABLE public.country TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.address TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.supervisor TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.employee_phone_number TO jupitormanager;
GRANT SELECT, UPDATE, INSERT ON TABLE public.emergency_contact_details TO jupitormanager;


GRANT ALL ON TABLE public.session TO jupitormanager;
GRANT ALL ON SEQUENCE public.address_address_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.city_city_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.country_country_id_seq TO jupitormanager;
GRANT ALL ON SEQUENCE public.personal_information_employee_id_seq TO jupitormanager;

GRANT EXECUTE ON PROCEDURE public.addtosupervisort(employee_ids integer[], val_supervisor_id integer, arraylength integer) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.updateSupervisorTable() TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getsupervisors(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.getnosupervisoremployees(branch character varying, department character varying, jobtitle character varying) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcity(cityname character varying, countryid numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setaddress(addressname character varying, cityid numeric, postalcode numeric) TO jupitormanager;
GRANT EXECUTE ON FUNCTION public.setcountry(c character varying) TO jupitormanager;
---------------------------------------------------------------------------------------------------------------------