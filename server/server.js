const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 2
  }
});

var newUser = new User({
  email: 'rodrigo@morgado.cl'
});

newUser.save().then((user) => {
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});

// var newTodo = new Todo({
//   text: 'Kill Everyone',
//   completed: true,
//   completedAt: 101919129
// });

// newTodo.save().then((doc) =>{
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//   console.log('Unable to save todo')
// });