const Joi = require("joi");

const branchValidator=Joi.object().options({abortEarly:false}).keys({
    
    branch_name:Joi.string().required().label('branch_name'),
    address:Joi.string().required().label('address'),
    city:Joi.string().required().label('city'),
    postal_code:Joi.string().required().label('postal_code'),
    country:Joi.string().required().label('country'),

})

module.exports={branchValidator}