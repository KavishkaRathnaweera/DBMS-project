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

