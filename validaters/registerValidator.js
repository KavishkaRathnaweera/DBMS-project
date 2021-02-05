const Joi=require('joi')
const registerValidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),
    address_id:Joi.string().required().label('address_id'),
    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    branch_id:Joi.string().required().label("branch_id"),
    job_title:Joi.string().required().label("job_title"),
    dept_name:Joi.string().required().label("dept_name"),
    paygrade_level:Joi.string().required().label("paygrade_level"),
    e_status_name:Joi.string().required().label("e_sataus_name")
   
})


const adminRegisterValidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),
    address_id:Joi.string().required().label('address_id'),
    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    securityKey:Joi.string().required().label("securityKey")
})
addHRvalidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),
    address_id:Joi.string().required().label('address_id'),
    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    branch_id:Joi.string().required().label("branch_id"),
    job_title:Joi.string().required().label("job_title"),
    dept_name:Joi.string().required().label("dept_name"),
    paygrade_level:Joi.string().required().label("paygrade_level"),
    e_status_name:Joi.string().required().label("e_sataus_name")

})


module.exports={adminRegisterValidator, addHRvalidator, registerValidator}
