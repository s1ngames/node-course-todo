// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');

//  db.collection('Todos').findOneAndUpdate({
//    text:'eat launch'
//  },{
//    $set:{
//      completed: true
//    }
//  },{
//    returnOriginal:false
//  }).then((result)=>{
// console.log(result);
//  },(err)=>{
//
//  });

db.collection('Users').findOneAndUpdate({
  name:'Nitz'
},{
  $set:{
    name: "Nitz_2"
  },
    $inc:{
      age:1

  }
},{
  returnOriginal:false
}).then((result)=>{
console.log(result);
},(err)=>{

});


  // db.close();
});
