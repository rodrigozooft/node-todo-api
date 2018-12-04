const {MongoClient, ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');

  // DeleteMany

  // db.collection('Todos').deleteMany({text: 'Eat well'}).then((result) => {
  //   console.log(result);
  // });

  // DeleteOne

  // db.collection('Todos').deleteOne({text: 'Eat fun'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((doc) =>{
  //   console.log(doc);
  // });

  db.collection('Users').deleteMany({name: 'Federico'}).then((result) => {
    console.log(result);
  });

  // FindOne and Delete
});