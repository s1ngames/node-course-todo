const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{ //declare model
  text:{
     type: String,
     required: true,
     minlength: 1,
     trim:true//removing start and end empties
  },
  completed: {
     type: Boolean,
     default:false
  },
  completedAt:{
    type : Number,
    default:false
  }
});

module.exports={
  Todo
};
