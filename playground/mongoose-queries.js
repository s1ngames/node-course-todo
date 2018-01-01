const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');








// var id = '6a494c505bd356a40ce7fc3a';
//
// if(!ObjectID.isValid(id)){ //not if exsist, but if valid
//   console.log('its not valid');
// }


// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Unable to find ID');
//   }
//   console.log('Todo by ID', todo);
// });
