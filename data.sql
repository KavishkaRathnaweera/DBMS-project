
INSERT INTO public.country(
	country_id, country)
	VALUES (1, 'Sri lanka');

INSERT INTO public.city(
	city_id, city, country_id)
	VALUES (1, 'kelaniya', 1);


	
	
INSERT INTO public.address(
	address_id, address, city_id, postal_code)
	VALUES (1, 'sinharamulla', 1, 11600);




INSERT INTO public.branch(
	branch_name, address_id)
	VALUES ('new tel', 1);

INSERT INTO public.department(
	dept_name)
	VALUES ('HR'), ('software');
	


INSERT INTO public.employee_status(
	e_status_name, duration, description)
	VALUES ('permanent', '6 months', 'sdedf');


insert into job_type (job_title) values('HR') ,('Manager'), ('software engineer');

INSERT INTO public.pay_grade(
	paygrade_level, description, requirement)
	VALUES ('level 1', 'jvjjcjmmm5', '4 years'),  ('level 2', 'jvjjcjmmm5','4 years' );

INSERT INTO public.leave(
	paygrade_level, anual, casual, maternity, no_pay)
	VALUES ('level 1', 104, 22, 255, 22);


-- real password 12345678

INSERT INTO public.personal_information(
	employee_id, nic, first_name, gender, birth_day, address_id, email, password, photo, registered_date)
	VALUES (4	,'4578999977',	'indunil','male','2016-02-02',1	,'indunil773@gmail.com'	,'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe'	,'http://res.cloudinary.com/dm36weewi/image/upload/v1614495778/kv55okywbeukso22oapv.png','2021-02-27'),
	(9,'4578998899'	,'indunil','male','2021-02-02',1,'udayangana19958@gmail.com','$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe'	,'http://res.cloudinary.com/dm36weewi/image/upload/v1614499399/rrbbntdyu7zpz0ntgq5f.png','2021-02-28'),
	(13,'524789655V','indunil','Male','1989-01-02'	,1	,'indunil348@gmail.com'	,'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe','','2021-02-28'),
	(14	,'124578986V','indunil','Male'	,'1986-12-28',	1,	'indunil553@gmail.com',	'$2b$10$jQHLWUqTH16JsVo0VyIw1eJZBWrovYg80BbMI58IM4zdA3JbUMECe','','2021-02-28');
	


INSERT INTO public.admin(
	employee_id)
	VALUES (4);

INSERT INTO public.employee(
	employee_id, branch_name, job_title, dept_name, paygrade_level, e_status_name, supervisor)
	VALUES (9,'new tel','HR','HR','level 1','permanent'	,false), (13	,'new tel',	'Manager'	,'software',	'level 1',	'permanent'	,false),
    (14	,'new tel'	,'software engineer',	'software'	,'level 1',	'permanent'	,true);
INSERT INTO public.personal_information_custom(
	employee_id)
	VALUES (9), (13), (14);

INSERT INTO public.supervisor(
	employee_id, supervisor_id)
	VALUES (14, 13);

INSERT INTO public.leave_record(
	leave_id, employee_id, leave_type, apply_date, start_date, duration, reason, approval_state)
	VALUES (1,13,'anual','2021-02-28','2021-02-09',5,'nidimathai','No');

INSERT INTO public.emergency_contact_details(
	employee_id, relative_name, contact_no)
	VALUES (13,'indunil','0147896534'), (14,'indunil','0714569875');

INSERT INTO public.employee_phone_number(
	employee_id, phone)
	VALUES (13,'0147896534'
), (14,'0714569875');
	





	
	


