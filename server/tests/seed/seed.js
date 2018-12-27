const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'manila@manila.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'KillingPeople123!').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass'
}];

const todos = [
  {_id: new ObjectID(), text: 'My first todo', completed: false}, 
  {_id: new ObjectID(), text: 'My second todo'}, 
  {_id: new ObjectID(), text: 'My third todo', completed: true, completedAt: 1900}
];

const populateTodos = (done) => {
  Todo.deleteMany({}).then(()=> {
      return Todo.insertMany(todos);
  }).then(()=> done());
};

const populateUsers = (done) => {
  User.deleteMany({}).then(() =>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
