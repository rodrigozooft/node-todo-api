const {MongoClient, ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate(
    {
      text: 'Eat Fun'
    }, {
      $set: {completed: true}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c042f899770f90539f4a40b')
  }, {
    $set: {
      name: 'Rodrigo Morgado'
    }, 
    $inc: {
      age: 10
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  });
});