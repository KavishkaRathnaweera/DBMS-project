--create role jupitor

CREATE ROLE agri_app WITH LOGIN PASSWORD 'password';

-- Database: jupitor

--DROP DATABASE jupitor;

CREATE DATABASE jupitor
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE jupitor TO postgres;

GRANT TEMPORARY, CONNECT ON DATABASE jupitor TO PUBLIC;

GRANT ALL ON DATABASE jupitor TO jupitor;

-- Table: public.address

-- DROP TABLE public.address;
CREATE TABLE public.address
(
    address_id integer NOT NULL DEFAULT nextval('address_address_id_seq'::regclass),
    adress character varying COLLATE pg_catalog."default" NOT NULL,
    city_id integer NOT NULL,
    postal_code integer NOT NULL,
    CONSTRAINT address_pkey PRIMARY KEY (address_id),
    CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES public.city (city_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.address
    OWNER to postgres;

GRANT ALL ON TABLE public.address TO jupitor;

GRANT ALL ON TABLE public.address TO postgres;


CREATE TABLE public.admin
(
    employee_id integer NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (employee_id),
    CONSTRAINT admin_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.admin
    OWNER to postgres;

GRANT ALL ON TABLE public.admin TO jupitor;

GRANT ALL ON TABLE public.admin TO postgres;


-- Table: public.branch

-- DROP TABLE public.branch;

CREATE TABLE public.branch
(
    branch_id integer NOT NULL DEFAULT nextval('branch_branch_id_seq'::regclass),
    branch_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    address_id integer NOT NULL,
    CONSTRAINT branch_pkey PRIMARY KEY (branch_id),
    CONSTRAINT branch_address_id_fkey FOREIGN KEY (address_id)
        REFERENCES public.address (address_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.branch
    OWNER to postgres;

GRANT ALL ON TABLE public.branch TO jupitor;

GRANT ALL ON TABLE public.branch TO postgres;

-- Table: public.city

-- DROP TABLE public.city;

CREATE TABLE public.city
(
    city_id integer NOT NULL DEFAULT nextval('city_city_id_seq'::regclass),
    city character varying(100) COLLATE pg_catalog."default" NOT NULL,
    country_id integer NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (city_id),
    CONSTRAINT city_country_id_fkey FOREIGN KEY (country_id)
        REFERENCES public.country (country_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.city
    OWNER to postgres;

GRANT ALL ON TABLE public.city TO jupitor;

GRANT ALL ON TABLE public.city TO postgres;



-- Table: public.country

-- DROP TABLE public.country;

CREATE TABLE public.country
(
    country_id integer NOT NULL DEFAULT nextval('country_country_id_seq'::regclass),
    country character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT country_pkey PRIMARY KEY (country_id)
)

TABLESPACE pg_default;

ALTER TABLE public.country
    OWNER to postgres;

GRANT ALL ON TABLE public.country TO jupitor;

GRANT ALL ON TABLE public.country TO postgres;



-- Table: public.department

-- DROP TABLE public.department;

CREATE TABLE public.department
(
    dept_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    employee_count integer NOT NULL DEFAULT 0,
    building character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT department_pkey PRIMARY KEY (dept_name)
)

TABLESPACE pg_default;

ALTER TABLE public.department
    OWNER to postgres;

GRANT ALL ON TABLE public.department TO jupitor;

GRANT ALL ON TABLE public.department TO postgres;




-- Table: public.emergency_contact_details

-- DROP TABLE public.emergency_contact_details;

CREATE TABLE public.emergency_contact_details
(
    employee_id integer NOT NULL,
    relative_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    contact_no character varying(45) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT emergency_contact_details_pkey PRIMARY KEY (employee_id),
    CONSTRAINT emergency_contact_details_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.emergency_contact_details
    OWNER to postgres;

GRANT ALL ON TABLE public.emergency_contact_details TO jupitor;

GRANT ALL ON TABLE public.emergency_contact_details TO postgres;



-- Table: public.employee

-- DROP TABLE public.employee;

CREATE TABLE public.employee
(
    employee_id integer NOT NULL,
    branch_id integer NOT NULL,
    job_title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    dept_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    paygrade_level character varying(50) COLLATE pg_catalog."default" NOT NULL,
    e_status_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_branch_id_fkey FOREIGN KEY (branch_id)
        REFERENCES public.branch (branch_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_dept_name_fkey FOREIGN KEY (dept_name)
        REFERENCES public.department (dept_name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_e_status_name_fkey FOREIGN KEY (e_status_name)
        REFERENCES public.employee_status (e_status_name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_job_title_fkey FOREIGN KEY (job_title)
        REFERENCES public.job_type (job_title) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES public.pay_grade (paygrade_level) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.employee
    OWNER to postgres;

GRANT ALL ON TABLE public.employee TO jupitor;

GRANT ALL ON TABLE public.employee TO postgres;

-- Trigger: incrementempcount

-- DROP TRIGGER incrementempcount ON public.employee;

CREATE TRIGGER incrementempcount
    AFTER INSERT
    ON public.employee
    FOR EACH ROW
    EXECUTE PROCEDURE public.changeempcount();




-- Table: public.employee_leave

-- DROP TABLE public.employee_leave;

CREATE TABLE public.employee_leave
(
    employee_id integer NOT NULL,
    year integer NOT NULL,
    anual integer DEFAULT 0,
    casual integer DEFAULT 0,
    maternity integer DEFAULT 0,
    no_pay integer DEFAULT 0,
    CONSTRAINT employee_leave_pkey PRIMARY KEY (employee_id, year),
    CONSTRAINT employee_leave_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.employee_leave
    OWNER to postgres;

GRANT ALL ON TABLE public.employee_leave TO jupitor;

GRANT ALL ON TABLE public.employee_leave TO postgres;



-- Table: public.employee_phone_number

-- DROP TABLE public.employee_phone_number;

CREATE TABLE public.employee_phone_number
(
    employee_id integer NOT NULL,
    phone character varying(45) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT employee_phone_number_pkey PRIMARY KEY (employee_id, phone),
    CONSTRAINT employee_phone_number_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.employee_phone_number
    OWNER to postgres;

GRANT ALL ON TABLE public.employee_phone_number TO jupitor;

GRANT ALL ON TABLE public.employee_phone_number TO postgres;


-- Table: public.employee_status

-- DROP TABLE public.employee_status;

CREATE TABLE public.employee_status
(
    e_status_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    duration character varying(50) COLLATE pg_catalog."default",
    description character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT employee_status_pkey PRIMARY KEY (e_status_name)
)

TABLESPACE pg_default;

ALTER TABLE public.employee_status
    OWNER to postgres;

GRANT ALL ON TABLE public.employee_status TO jupitor;

GRANT ALL ON TABLE public.employee_status TO postgres;



-- Table: public.job_type

-- DROP TABLE public.job_type;

CREATE TABLE public.job_type
(
    job_title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(50) COLLATE pg_catalog."default",
    req_qualification character varying(50) COLLATE pg_catalog."default",
    prerequisites character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT job_type_pkey PRIMARY KEY (job_title)
)

TABLESPACE pg_default;

ALTER TABLE public.job_type
    OWNER to postgres;

GRANT ALL ON TABLE public.job_type TO jupitor;

GRANT ALL ON TABLE public.job_type TO postgres;


-- Table: public.leave

-- DROP TABLE public.leave;

CREATE TABLE public.leave
(
    paygrade_level character varying(50) COLLATE pg_catalog."default" NOT NULL,
    anual integer NOT NULL,
    casual integer NOT NULL,
    maternity integer NOT NULL,
    no_pay integer NOT NULL,
    CONSTRAINT leave_pkey PRIMARY KEY (paygrade_level),
    CONSTRAINT leave_paygrade_level_fkey FOREIGN KEY (paygrade_level)
        REFERENCES public.pay_grade (paygrade_level) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.leave
    OWNER to postgres;

GRANT ALL ON TABLE public.leave TO jupitor;

GRANT ALL ON TABLE public.leave TO postgres;


-- Table: public.leave_record

-- DROP TABLE public.leave_record;

CREATE TABLE public.leave_record
(
    leave_id integer NOT NULL DEFAULT nextval('leave_record_leave_id_seq'::regclass),
    employee_id integer NOT NULL,
    leave_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    apply_date date NOT NULL,
    start_date date NOT NULL,
    duration integer NOT NULL,
    reason character varying COLLATE pg_catalog."default" NOT NULL,
    approval_state character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'No'::character varying,
    CONSTRAINT leave_record_pkey PRIMARY KEY (leave_id),
    CONSTRAINT leave_record_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.personal_information (employee_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.leave_record
    OWNER to postgres;

GRANT ALL ON TABLE public.leave_record TO jupitor;

GRANT ALL ON TABLE public.leave_record TO postgres;



-- Table: public.pay_grade

-- DROP TABLE public.pay_grade;

CREATE TABLE public.pay_grade
(
    paygrade_level character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(50) COLLATE pg_catalog."default",
    requirement character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT pay_grade_pkey PRIMARY KEY (paygrade_level)
)

TABLESPACE pg_default;

ALTER TABLE public.pay_grade
    OWNER to postgres;

GRANT ALL ON TABLE public.pay_grade TO jupitor;

GRANT ALL ON TABLE public.pay_grade TO postgres;


-- Table: public.personal_information

-- DROP TABLE public.personal_information;

CREATE TABLE public.personal_information
(
    employee_id integer NOT NULL DEFAULT nextval('personal_information_employee_id_seq'::regclass),
    nic character varying(50) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    gender character varying(50) COLLATE pg_catalog."default" NOT NULL,
    birth_day date,
    address_id integer NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default",
    photo bytea,
    registered_date date DEFAULT CURRENT_DATE,
    CONSTRAINT personal_information_pkey PRIMARY KEY (employee_id)
)

TABLESPACE pg_default;

ALTER TABLE public.personal_information
    OWNER to postgres;

GRANT ALL ON TABLE public.personal_information TO jupitor;

GRANT ALL ON TABLE public.personal_information TO postgres;


-- Table: public.session

-- DROP TABLE public.session;

CREATE TABLE public.session
(
    sid character varying COLLATE pg_catalog."default" NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
)

TABLESPACE pg_default;

ALTER TABLE public.session
    OWNER to postgres;

GRANT ALL ON TABLE public.session TO jupitor;

GRANT ALL ON TABLE public.session TO postgres;
-- Index: IDX_session_expire

-- DROP INDEX public."IDX_session_expire";

CREATE INDEX "IDX_session_expire"
    ON public.session USING btree
    (expire ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.supervisor

-- DROP TABLE public.supervisor;

CREATE TABLE public.supervisor
(
    employee_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    supervisor_id character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT supervisor_pkey PRIMARY KEY (employee_id)
)

TABLESPACE pg_default;

ALTER TABLE public.supervisor
    OWNER to postgres;

GRANT ALL ON TABLE public.supervisor TO jupitor;

GRANT ALL ON TABLE public.supervisor TO postgres;


-- FUNCTION: public.changeempcount()

-- DROP FUNCTION public.changeempcount();

CREATE FUNCTION public.changeempcount()
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

ALTER FUNCTION public.changeempcount()
    OWNER TO postgres;


