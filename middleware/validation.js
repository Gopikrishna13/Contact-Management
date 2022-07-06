const Joi = require('joi');

const validation = Joi.object({

    name: Joi.string().min(5).max(30).regex(/^[a-zA-Z]+$/).required(),

    mail: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required(),
    address: {
      street: Joi.string().min(5).max(30).required(),
      city: Joi.string().min(5).max(30).required(),
      country: Joi.string().min(5).max(30).required()
    },
    socialmedia: {
      facebook: Joi.string().min(0).max(30),
      twitter: Joi.string().min(0).max(30)
    }

  });


  module.exports=validation;
