const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

/* 
 == Todo.remove({}). This will remove the entire collection of todos == 

Todo.remove({}).then((result) => {
  console.log(result);
});

*/

// Todo.findOneAndRemove(), this return the object removed.

Todo.findOneAndRemove({text: 'Destroy Cencosud'}).then((todo) => {
  console.log(todo);
});



/* 

== Todo.findByIdAndRemove(), this return the object removed. ==

Todo.findByIdAndRemove('5c1189d9355dff013c00f390').then((todo) => {
  console.log(todo);
});

*/