const { ObjectID } = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

if(!module.parent){
  app.listen(3000, () => {
    console.log('The server is running in 3000');
  });
}

module.exports  = {
  app
};