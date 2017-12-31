// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MondoDB server');

//deleteMany
// db.collection('Todos').deleteMany({text: 'eat launch'}).then((result)=>{
//   console.log(result);
// },(err)=>{
//
// });

//deleteOne(delete the first that match)
// db.collection('Todos').deleteOne({text: 'eat launch'}).then((result)=>{
//   console.log(result);
// },(err)=>{
//
// });

//findOneAndDelete --- give the deleted data
db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  console.log(result);
},(err)=>{

});


  // db.close();
});
