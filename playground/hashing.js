// const {SHA256} = require('crypto-js');
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

const bcrypt = require('bcryptjs');
var password ='123abc!';
// 
// bcrypt.genSalt(10,(err,salt)=>{//rounds of random secrets
//   bcrypt.hash(password,salt , (error,hash)=>{
//     console.log(hash);
//   });
// });

var hashed ='$2a$10$CBL7mmjtkzRO9rYZkL8xXOqbDrpUpJu9t.WvYshCXqkbfcXgDQyna';
bcrypt.compare(password,hashed,(err,res)=>{
console.log(res);
});




//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const jwt = require('jsonwebtoken');
//
// var data ={
//   id:10
// };
//
//
// var token = jwt.sign(data,'123abc');//id,secret addon to hash
//
// var decoded = jwt.verify(token,'123abc');//token we want to verify , and secret
// console.log(decoded);
