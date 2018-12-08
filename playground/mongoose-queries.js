const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

var todoId = '5c0c46605cb4e403d3c972d7';
var userId = '5c083c9a249ef42dea005aba'

// if (!ObjectID.isValid(todoId)){
//   console.log('The id is not valid man!');
// }

// Todo.find({
//   _id: todoId
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// Todo.findOne({
//   _id: todoId
// }).then((todo) => {
//   console.log('Todo: ', todo);
// }); 

// Todo.findById(todoId).then((todoById) => {
//   if(!todoById){
//     return console.log('Id not found!');
//   }
//   console.log('Todo By ID: ', todoById);
// }).catch((e) => {
//   console.log(e);
// })

User.find({
  _id: userId
}).then((users) => {
  console.log('Users: ', users);
});

User.findOne({
  _id: userId
}).then((user) => {
  console.log('User: ', user);
})

User.findById(userId).then((userById) => {
  if(!userById){
    console.log('User not found!');
  }
  console.log('User by Id: ', userById)
}).catch((e) => {
  console.log(e);
})