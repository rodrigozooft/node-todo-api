require('./config/config'); 

const { ObjectID } = require('mongodb');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/particular_todo

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/162517

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)){
    Todo.findById(id).then((todo) => {
      if(todo){
        res.send({todo});
      } else {
        res.status(404).send('No todo with that ID');
      }
    }).catch((err) =>{
      res.status(400).send();
    })
  } else{
    res.status(404).send('Is not a valid ID');
  }

});

// DELETE /todos/162517

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)){
    Todo.findByIdAndRemove(id).then((todo) => {
      if (todo === null){
        res.status(404).send('Todo was not found');
      }else{
        res.status(200).send({todo});
      }
    }).catch((err) => {
      res.status(400).send("We couldn't process your request");
    });
  } else {
    res.status(404).send('It is not a valid Id');
  }
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  })

});

app.post('/users', (req, res) => {
  var userBody = _.pick(req.body, ['email', 'password']);
  var token = [
    {access: "haidhaosdasmdlas"},
    {token: "jaisjoasmdaspdasodpjsa"}
  ]
  var user = new User(_.assign({}, userBody, token));
  console.log(user);

  user.save().then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

if(!module.parent){
  app.listen(PORT, () => {
    console.log(`The server is running in the port: ${PORT}`);
  });
}

module.exports  = {
  app
};