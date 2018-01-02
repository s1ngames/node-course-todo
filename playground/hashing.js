// const {SHA256} = require('crypto-js');
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

const jwt = require('jsonwebtoken');

var data ={
  id:10
};


var token = jwt.sign(data,'123abc');//id,secret addon to hash

var decoded = jwt.verify(token,'123abc');//token we want to verify , and secret
console.log(decoded);
