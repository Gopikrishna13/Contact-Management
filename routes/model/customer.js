const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const customerschema=new Schema({
name:{
    type:String,
    unique:true

},
mail:{
    type:String,
    
    unique:true
},
address:{
    street:{
        type:String,
       
        
    },

    city:{
        type:String,
        
    },

    country:{
        type:String,
       
    }
},
socialmedia:{
    facebook:{
        type:String,
      
        unique:true
    },
    twitter:{
        type:String,
        
        unique:true
    }
}
});

const customer=mongoose.model("customer",customerschema);
module.exports=customer;