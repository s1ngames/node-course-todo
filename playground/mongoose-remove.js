const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

//Todo.remove({}).then....
//remove by filter (more then one), if just sograim, meif akol
//dont get the document back




//Todo.findOneAndRemove().then-- return the document itself

//todo.findByIdAndRemove() by id

Todo.findByIdAndRemove('5a4a6b7e218e9b482b52b193').then((todo)=>{
console.log(todo);
});
