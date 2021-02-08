DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS personal_information CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS branch CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS emergency_contact_details CASCADE;
DROP TABLE IF EXISTS employee_status CASCADE;
DROP TABLE IF EXISTS job_type CASCADE;
DROP TABLE IF EXISTS pay_grade CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS employee_leave CASCADE;
DROP TABLE IF EXISTS employee_phone_number CASCADE;
DROP TABLE IF EXISTS leave CASCADE;
DROP TABLE IF EXISTS leave_record CASCADE;
DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS supervisor CASCADE;


CREATE DATABASE jupitor;

CREATE ROLE jupitor WITH LOGIN PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE jupitor TO jupitor;

-- psql -U jupitor jupitor




CREATE TABLE country
(
    country_id SERIAL NOT NULL ,
    country varchar(100) NOT NULL,
    CONSTRAINT country_pkey PRIMARY KEY (country_id)
);
CREATE TABLE city
(
    city_id SERIAL NOT NULL ,
    city varchar(100) NOT NULL,
    country_id integer NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (city_id),
    CONSTRAINT city_country_id_fkey FOREIGN KEY (country_id)
        REFERENCES country (country_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);




CREATE TABLE address
(
    address_id SERIAL NOT NULL ,
    adress varchar(100) NOT NULL,
    city_id integer NOT NULL,
    postal_code integer NOT NULL,
    CONSTRAINT address_pkey PRIMARY KEY (address_id),
    CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES city (city_id)  ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE personal_information
(
    employee_id SERIAL NOT NULL ,
    nic varchar(50)  NOT NULL,
    first_name varchar(100) ,
    middle_name varchar(100) ,
    last_name varchar(100) ,
    gender varchar(50) ,
    birth_day date,
    address_id integer NOT NULL,
    email varchar(100)  NOT NULL,
    password varchar(250) ,
    photo bytea,
    registered_date date DEFAULT CURRENT_DATE,
    CONSTRAINT personal_information_pkey PRIMARY KEY (employee_id),
    CONSTRAINT address_id_fkey FOREIGN KEY (address_id)
        REFERENCES address (address_id)  ON UPDATE CASCADE
        ON DELETE CASCADE
    
);



CREATE TABLE admin
(
    employee_id integer NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (employee_id),
    CONSTRAINT admin_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) ON UPDATE CASCADE
        ON DELETE CASCADE
);




CREATE TABLE branch
(
    
    branch_name varchar(100) NOT NULL,
    address_id integer NOT NULL,
    CONSTRAINT branch_pkey PRIMARY KEY (branch_name),
    CONSTRAINT branch_address_id_fkey FOREIGN KEY (address_id)
        REFERENCES address (address_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE department
(
    dept_name varchar(100)  NOT NULL,
    employee_count integer NOT NULL DEFAULT 0,
    building varchar(100) ,
    CONSTRAINT department_pkey PRIMARY KEY (dept_name)
);




CREATE TABLE emergency_contact_details
(
    employee_id integer NOT NULL,
    relative_name varchar(100)  NOT NULL,
    contact_no varchar(45)  NOT NULL,
    CONSTRAINT emergency_contact_details_pkey PRIMARY KEY (employee_id),
    CONSTRAINT emergency_contact_details_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employee_status
(
    e_status_name varchar(50)  NOT NULL,
    duration varchar(50) ,
    description varchar(50) ,
    CONSTRAINT employee_status_pkey PRIMARY KEY (e_status_name)
);


CREATE TABLE job_type
(
    job_title varchar(50)  NOT NULL,
    description varchar(50) ,
    req_qualification varchar(50) ,
    prerequisites varchar(50) ,
    CONSTRAINT job_type_pkey PRIMARY KEY (job_title)
);

CREATE TABLE pay_grade
(
    paygrade_level varchar(50)  NOT NULL,
    description varchar(50) ,
    requirement varchar(50) ,
    CONSTRAINT pay_grade_pkey PRIMARY KEY (paygrade_level)
);

CREATE TABLE employee
(
    employee_id integer NOT NULL,
    branch_name varchar(100) NOT NULL,
    job_title varchar(50)  NOT NULL,
    dept_name varchar(100)  NOT NULL,
    paygrade_level varchar(50)  NOT NULL,
    e_status_name varchar(50)  NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_branch_name_fkey FOREIGN KEY (branch_name)
        REFERENCES branch (branch_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_dept_name_fkey FOREIGN KEY (dept_name)
        REFERENCES department (dept_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_e_status_name_fkey FOREIGN KEY (e_status_name)
        REFERENCES employee_status (e_status_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_job_title_fkey FOREIGN KEY (job_title)
        REFERENCES job_type (job_title) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES pay_grade (paygrade_level) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE employee_leave
(
    employee_id integer NOT NULL,
    year integer NOT NULL,
    anual integer DEFAULT 0,
    casual integer DEFAULT 0,
    maternity integer DEFAULT 0,
    no_pay integer DEFAULT 0,
    CONSTRAINT employee_leave_pkey PRIMARY KEY (employee_id, year),
    CONSTRAINT employee_leave_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employee_phone_number
(
    employee_id integer NOT NULL,
    phone varchar(45)  NOT NULL,
    CONSTRAINT employee_phone_number_pkey PRIMARY KEY (employee_id, phone),
    CONSTRAINT employee_phone_number_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE leave
(
    paygrade_level varchar(50)  NOT NULL,
    anual integer NOT NULL,
    casual integer NOT NULL,
    maternity integer NOT NULL,
    no_pay integer NOT NULL,
    CONSTRAINT leave_pkey PRIMARY KEY (paygrade_level),
    CONSTRAINT leave_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES pay_grade (paygrade_level) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
        
);

CREATE TABLE leave_record
(
    leave_id SERIAL NOT NULL,
    employee_id integer NOT NULL,
    leave_type varchar(50)  NOT NULL,
    apply_date date NOT NULL,
    start_date date NOT NULL,
    duration integer NOT NULL,
    reason varchar(200),
    approval_state varchar(10)  NOT NULL DEFAULT 'No'::varchar,
    CONSTRAINT leave_record_pkey PRIMARY KEY (leave_id),
    CONSTRAINT leave_record_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES personal_information (employee_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE supervisor
(
    employee_id integer NOT NULL,
    supervisor_id integer ,
    CONSTRAINT supervisor_pkey PRIMARY KEY (employee_id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


CREATE OR REPLACE PROCEDURE addToSupervisorT(
    employee_ids integer[],
    val_supervisor_id int

)

LANGUAGE plpgsql
AS $$
DECLARE
    arraylength int := array_length(materials, 1);
    i int;
BEGIN
    for  i in 1..arraylength
    loop
           INSERT INTO supervisor VALUES(employee_ids[i], val_supervisor_id ) ON CONFLICT DO NOTHING;
    end loop;
    commit;

END;
$$;


CREATE TRIGGER removeSupervisor
    AFTER UPDATE
    OF supervisor
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE deleteSupervisorGroup();


CREATE OR REPLACE FUNCTION deleteSupervisorGroup()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF (NOT NEW.supervisor) AND OLD.supervisor THEN
		DELETE FROM supervisor WHERE supervisor_id = OLD.employee_id;
	END IF;

	RETURN NEW;
END;
$$






GRANT ALL ON TABLE public.address TO jupitor;

GRANT ALL ON TABLE public.admin TO jupitor;

GRANT ALL ON TABLE public.branch TO jupitor;

GRANT ALL ON TABLE public.city TO jupitor;

GRANT ALL ON TABLE public.country TO jupitor;

GRANT ALL ON TABLE public.department TO jupitor;

GRANT ALL ON TABLE public.emergency_contact_details TO jupitor;

GRANT ALL ON TABLE public.employee TO jupitor;

GRANT ALL ON TABLE public.employee_leave TO jupitor;

GRANT ALL ON TABLE public.employee_phone_number TO jupitor;

GRANT ALL ON TABLE public.employee_status TO jupitor;

GRANT ALL ON TABLE public.job_type TO jupitor;

GRANT ALL ON TABLE public.leave TO jupitor;

GRANT ALL ON TABLE public.leave_record TO jupitor;

GRANT ALL ON TABLE public.pay_grade TO jupitor;

GRANT ALL ON TABLE public.personal_information TO jupitor;

GRANT ALL ON TABLE public.session TO jupitor;

GRANT ALL ON TABLE public.supervisor TO jupitor;

-- Sandaruwn Functions--------------------------------------------------------------------------------------------------------------------


CREATE FUNCTION emp_stamp6() RETURNS trigger AS $BODY$

DECLARE
count1 INTEGER :=0 ;
		
 		BEGIN
  		IF( NEW.leave_type ='anual') THEN
		select anual into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
 		UPDATE employee_leave SET anual = count1 - 1 WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
  		IF( NEW.leave_type ='casual') THEN
 		select casual into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
 		UPDATE employee_leave SET casual = count1 - 1 WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
		
  		IF( NEW.leave_type ='maternity') THEN
 		select maternity into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
 		UPDATE employee_leave SET maternity = count1 - 1 WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
  		IF( NEW.leave_type ='no_pay') THEN
 		select no_pay into count1 from employee_leave where employee_id = NEW.employee_id and year = 2021;
 		UPDATE employee_leave SET no_pay = count1 - 1 WHERE employee_id = NEW.employee_id  AND year = 2021 ; END IF;
		
		return new;
END;
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER leave_count AFTER UPDATE ON leave_record FOR EACH ROW EXECUTE PROCEDURE emp_stamp6();

create function getleavea ( s_id numeric)
returns table(
		leave_id int,
		employee_id int,
		first_name varchar ,
 		last_name varchar,
 		leave_type varchar
 	)
 	language plpgsql
as $$
begin
 	return query 
 		select l.leave_id,l.employee_id,p.first_name,p.last_name,l.leave_type from supervisor s left outer join leave_record  l on l.employee_id = s.employee_id
 		left outer join personal_information p on s.employee_id = p.employee_id
 		where s.supervisor_id = s_id AND l.approval_state = 'No' ;
end;$$



create function getEmployees ( s_id numeric)
returns table(
 		employee_id int,
 		first_name varchar ,
  		last_name varchar,
  		count_leaves int
  	)
  	language plpgsql
 as $$
 begin
  	return query 
  		select s.employee_id,p.first_name,p.last_name, e.anual+e.casual+e.maternity+e.no_pay AS count_leaves from supervisor s left outer join personal_information  p  
	on s.employee_id = p.employee_id
	left outer join employee_leave e on e.employee_id = p.employee_id
  		where s.supervisor_id = s_id  AND year =2021 ;
end;$$




-- Indunil's section

CREATE FUNCTION changeempcount()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
      update department set employee_count=employee_count+1 where dept_name=new.dept_name;
	  return new;
   END;
$BODY$;



CREATE TRIGGER incrementempcount
    AFTER INSERT
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE changeempcount();





-- CREATE OR REPLACE FUNCTION changeempcount1() RETURNS TRIGGER AS $department_table$
--    BEGIN
--       update department set employee_count=employee_count-1 where dept_name=new.dept_name;
--       RETURN NEW;
--    END;
-- $department_table$ LANGUAGE plpgsql;

-- CREATE TRIGGER deccrementempcount
--     AFTER DELETE
--     ON employee
--     FOR EACH ROW
--     EXECUTE PROCEDURE changeempcount1();


-- CREATE OR REPLACE FUNCTION setcountry( c varchar(100)) RETURNS integer
-- 	AS $$
--     DECLARE
--     c_id integer;
--     BEGIN 
--         SELECT country_id INTO c_id FROM country
--         WHERE country=c;

--         IF c_id IS NULL THEN 
--         INSERT INTO country (country) VALUES (c)
--         RETURNING country_id INTO c_id ;

--         END IF;

--         RETURN c_id;
--     END;
--     $$ LANGUAGE PLpgSQL;


-- CREATE OR REPLACE FUNCTION setcity( cityname varchar(100), countryid integer) RETURNS integer
-- 	AS $$
--     DECLARE
--     c_id integer;
--     BEGIN 
--         SELECT city_id INTO c_id FROM city
--         WHERE city=cityname and country_id=countryid;

--         IF c_id IS NULL THEN 
--         INSERT INTO city (city, country_id) VALUES (cityname, country_id)
--         RETURNING city_id INTO c_id ;

--         END IF;

--         RETURN c_id;
--     END;
--     $$ LANGUAGE PLpgSQL;

-- CREATE OR REPLACE FUNCTION setaddress( addressname varchar(100), cityid integer, postalcode integer) RETURNS integer
-- 	AS $$
--     DECLARE
--     a_id integer;
--     BEGIN 
--         SELECT address_id INTO a_id FROM address
--         WHERE adress=addressname and city_id=cityid and postal_code=postalcode;

--         IF a_id IS NULL THEN 
--         INSERT INTO address (address, city_id,postal_code) VALUES (addressname, cityid, postalcode)
--         RETURNING address_id INTO a_id ;

--         END IF;

--         RETURN a_id;
--     END;
--     $$ LANGUAGE PLpgSQL;



Create Or Replace PROCEDURE updateJupitorLeaves(paygradelevel varchar(50), an integer, cas integer, mat integer, nopay integer)
LANGUAGE plpgsql
AS $$
BEGIN 
	UPDATE leave SET anual=an, casual=cas, maternity=mat, no_pay=nopay where paygrade_level=paygradelevel;
	IF NOT FOUND THEN
	INSERT INTO leave(paygrade_level, anual, casual, maternity,no_pay) values (an,cas, mat, nopay);
	END IF;
END;
$$;

-- call updateJupitorLeaves('level 1', 3 ,3 ,4 ,7)



