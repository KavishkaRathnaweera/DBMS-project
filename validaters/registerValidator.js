const Joi=require('joi')
const registerValidator=Joi.object().options({abortEarly:false}).keys({
    NIC:Joi.string().required().label('NIC').min(10),
    first_name:Joi.string().required().label('first_name'),
    middle_name:Joi.string().allow(null).allow("").label('middle_name'),
    last_name:Joi.string().allow(null).allow("").label('last_name'),
    gender:Joi.string().required().label('gender'),
    birthday:Joi.string().required().label('birthday'),

    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),
    
    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    branch_name:Joi.string().required().label("branch_name"),
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

    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),

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

    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),

    email:Joi.string().required().label('email'),
    password:Joi.string().required().label('password'),
    branch_name:Joi.string().required().label("branch_name"),
    job_title:Joi.string().required().label("job_title"),
    dept_name:Joi.string().required().label("dept_name"),
    paygrade_level:Joi.string().required().label("paygrade_level"),
    e_status_name:Joi.string().required().label("e_sataus_name")

})


module.exports={adminRegisterValidator, addHRvalidator, registerValidator}
