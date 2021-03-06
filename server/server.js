const express = require('express');
const bodyParser = require('body-parser'); //json to object
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req,res)=>{

var id = req.params.id;
if(!ObjectID.isValid(id)){
  return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((todo)=>{
if(!todo){
  return res.status(404).send();
}
res.send({todo});
}).catch((e)=>{
  return res.status(400).send();
});

//remove todo by id
//secuses //if no doc send 404
//if yes send back
//error - 400 empty body
});







//updating status
//app.patch to update a resourse (not on stone , just guidlines for seder)
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']) //user cant update other things inside todos //extract body to array (take the writen vars if they exist)       //reason for lodash
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime(); //return time stamp
  }else{
body.completed = false;
body.completedAt = null; //remove from db - set to null
  }

  Todo.findByIdAndUpdate(id,{
    $set: body
  },{
    new: true //return the new todo
  }).then((todo)=>{
if(!todo){
  return res.status(404).send();
}
res.send({todo});

  }).catch((e)=>{
res.status(400).send();
  });


});



//users  + authenticate***************************


// app.post('/users',(req,res)=>{
//
// var body =_.pick(req.body,['email','password']);  //one is pick from the request , and update only the written vars in array, so users cant change all the vars inside the model//takes out only the selected paremeters ,
//
// var user = new User({
// email: body.email,
// password: body.password
// });
//
// user.save().then(()=>{
// return user.generateAuthToken();
// }).then((token)=>{
//   res.header('x-auth',token).send(user);
// }).catch((e)=>{
//   res.status(400).send(e);
// });
// });

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});



app.get('/users/me',authenticate, (req,res)=>{
  res.send(req.user);
// var token = req.header('x-auth');
// User.findByToken(token).then((user)=>{
//   if(!user){
// return Promise.reject();
//   }
//   res.send(user);
// }).catch((e)=>{
//   res.status(401).send();
// });
});

//login
app.post('/users/login',(req,res)=>{
var body = _.pick(req.body, ['email', 'password']);
User.findByCredentials(body.email,body.password).then((user)=>{
return user.generateAuthToken().then((token)=>{
  res.header('x-auth',token).send(user);
});
}).catch((e)=>{
res.status(400).send();
});

});






app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
});
















//
// User.findOne({
//   'email': body.email
// },(err,doc)=>{
//   bcrypt.compare(body.password,doc.password,(err,result)=>{
//   if(result){
//     res.send(doc);
//   }else{
//     res.status(401).send();
//   }
//   });
// });







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
