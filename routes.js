const express = require("express");
const routes = express.Router();
const customer = require("./routes/model/customer");
const bodyParser = require("body-parser");
const Joi = require('joi');



routes.use(bodyParser.json());

routes.use('/',(req,res,next)=>{
  console.log("Call Recieved");
  next();
})
routes.get("/customerlist", async (req, res) => {
  const results = await customer.find();
  res.send(results);
});

routes.put("/updateuser/:userid", async (req, res) => {
  const id = req.params.userid;
  const query = req.body;
  console.log(query);
  const result = await customer.findByIdAndUpdate(id, query, { new: true });
  res.send(result);
});

routes.delete("/deleteuser/:userid", function (req, res) {
  const delid = req.params.userid;
  customer.findByIdAndDelete(delid, function (err, response) {
    if (err) console.log(err);
    else res.send(response);
  });
});

routes.get("/list/:id", function (req, res) {
  const id_query = req.params.id;
  customer.findById(id_query, function (err, response) {
    if (err) res.send(err);
    else res.send(response);
  });
});

routes.post("/customer", function (req, res,next) {

  console.log(req.body.address.street);
  

  const validation = Joi.object({
    
    name: Joi.string().min(5).max(30).regex(/^[a-zA-Z]+$/).required(),
                  
    mail: Joi.string()
           .email()
           .min(5)
           .max(50)
           .required(),
    address:{
      street:Joi.string().min(5).max(30).required(),
      city:Joi.string().min(5).max(30).required(),
      country:Joi.string().min(5).max(30).required(),
    },
    socialmedia:{
      facebook:Joi.string().min(5).max(30).required(),
      twitter:Joi.string().min(5).max(30).required(),
    }

});
const newcustomer={
  name:req.body.name,
  mail:req.body.mail,
  address:{
    street:req.body.address.street,
    city:req.body.address.city,
    country:req.body.address.country
  },
  socialmedia:{
    facebook:req.body.socialmedia.facebook,
    twitter:req.body.socialmedia.twitter
  }
};
console.log(newcustomer);
const{error}=validation.validate(newcustomer);
if(error)
{
  res.sendStatus(406);
 console.log(error);
}else{
  const newUser = customer.create({
    name: req.body.userName,
    mail: req.body.email,
    address:{
      street:req.body.street,
      city:req.body.street,
      country:req.body.country
    },
    socialmedia:{
      facebook:req.body.facebook,
      twitter:req.body.twitter
    }
  });
  if(newUser)
  {
    res.status(200);
    console.log("New User Added");
  }else{
    console.log("Failed")
  }
}

});



module.exports = routes;
