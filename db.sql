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

psql -U jupitor jupitor




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
    CONSTRAINT personal_information_pkey PRIMARY KEY (employee_id)
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
    branch_id SERIAL NOT NULL ,
    branch_name varchar(100) NOT NULL,
    address_id integer NOT NULL,
    CONSTRAINT branch_pkey PRIMARY KEY (branch_id),
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
    branch_id integer NOT NULL,
    job_title varchar(50)  NOT NULL,
    dept_name varchar(100)  NOT NULL,
    paygrade_level varchar(50)  NOT NULL,
    e_status_name varchar(50)  NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_branch_id_fkey FOREIGN KEY (branch_id)
        REFERENCES branch (branch_id) 
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

ALTER FUNCTION changeempcount()
    OWNER TO postgres;

CREATE TRIGGER incrementempcount
    AFTER INSERT
    ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE changeempcount();

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
    employee_id varchar(50)  NOT NULL,
    supervisor_id varchar(50) ,
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


--------------------------procedure------------------------
CREATE OR REPLACE PROCEDURE getEmployees(
    val_branch_id INTEGER,
    val_dept_name VARCHAR(100),
    val_job_title VARCHAR(100)

)
RETURNS TEXT[];    
LANGUAGE plpgsql

AS $$ 
DECLARE
	result TEXT[];
BEGIN
    result = SELECT employee_id,nic,first_name,last_name FROM personal_information JOIN employee USING(employee_id) where branch_id = val_branch_id  or val_branch_id  is null`;
    RETURN result; 
END;
$$;





CREATE ROLE jupitor WITH LOGIN PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE jupitor TO jupitor;



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

