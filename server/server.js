var express = require('express');
var bodyParser = require('body-parser'); //json to object
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); //setting app(express) to work with jsons

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{

  // var data = {
  //   doc:doc,
  //   message:'my message is here yay'
  // }
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});



app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  });
},(e)=>{
  res.status(400).send(e);
});


app.get('/todos/:id',(req,res)=>{
var id = req.params.id;
if(!ObjectID.isValid(id)){
  return res.status(404).send();
}


Todo.findById(id).then((todo)=>{
  if(!todo){
    // return console.log('Unable to find ID');
    return res.status(404).send();
  }
  // console.log('Todo by ID', todo);
  res.send({todo});//object, cant keep more data like strings
}).catch((e)=>{
    res.status(400).send();
});
});


app.listen(3000,()=>{
  console.log('Started on port 3000');
});

























//mongoose works with models(templates you define)



// var newTodo = new Todo({  //set values
//   text: 'Cook dinner'
// });

// var newTodo = new Todo({  //set values
//   text: 'Cook dinner',
//   completed: true,
//   completedAt: 123
// });
//
// newTodo.save().then((doc)=>{  //save
// console.log('Saved to do',doc);
// },(err)=>{
// console.log('Unable to save todo');
// });
//
//
//
// var user = new User({
// email:'nir@example.com        '
// });
//
// user.save().then((doc)=>{
//   console.log('User saved',doc);
// },(err)=>{
//   console.log('Unable to save user',err);
// });