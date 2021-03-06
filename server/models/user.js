const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

    email:{
      type:String,
      required:true,
      trim:true,
      minlength:1,
      unique: true,
      validate:{
        validator:(value)=>{
       return validator.isEmail(value);
        },
        message:'{VALUE} is not valid email'
      }
    },
  password:{
    type:String,
    requre :true,
  minlength:6
  },
  tokens:[{
    access:{
      type:String,
      require:true
    },
    token:{
      type:String,
      require:true
    }
  }]
  // usePushEach: true

});

UserSchema.methods.toJSON= function(){
  var user = this;
  var userObject  = user.toObject();
  return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  // user.tokens.push({access, token});

  user.tokens = user.tokens.concat({access, token});
  // user.tokens.push(access);
  // user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};


UserSchema.statics.findByToken = function(token){
var User = this;
var decoded;
try{
  decoded = jwt.verify(token,'abc123');
}catch(e){
// return new Promise((resolve,reject)=>{
//   reject();
// });
return Promise.reject();
}
return User.findOne({
  '_id' :decoded._id,
  'tokens.token' :token,
  'tokens.access':'auth'
});
};

UserSchema.pre('save',function (next){
  var user = this;

if(user.isModified('password')){

  bcrypt.genSalt(10,(err,salt)=>{//rounds of random secrets
    bcrypt.hash(user.password,salt , (error,hash)=>{
      // console.log(hash);
      user.password = hash;
      next();
    });
  });

}else{
  next();
}
});

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,result)=>{
     if(result){
    resolve(user);
  }else{reject();}

    });


  });
});
};


var User = mongoose.model('User',UserSchema);


module.exports={
  User
};
