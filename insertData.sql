<<<<<<< HEAD
--insert into job_type (job_title) values('HR') ,('Manager');
--insert into department (dept_name) values('HR');

INSERT INTO public.job_type(
	job_title, description, req_qualification, prerequisites)
	VALUES ('HR', 'head of HR department', '5 years expirience','degree or diploma in HR'),
	('Manager', 'manager of the relevant department', '5 years expirience','3 passes in advance level'),
	('Supervisor', 'managed a line', '2 years expirience','2 passes in advance level'),
	('operator', 'operates a sewing machine', 'sit to OL exam','');


INSERT INTO public.department(
	dept_name, employee_count, building)
	VALUES ('hr', '20', 'main'),
	('cutting', '30', 'cutting'),
	('stock', '30', 'stock'),
	('sewing', '200', 'sewing');


=======
insert into job_type (job_title) values('HR') ,('Manager');
>>>>>>> parent of 2e9ca89 (inserdata)
