
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to the database server');
  }
  console.log('Connected to MongodDB server');
  const db = client.db('TodoApp');
  
  client.close();
});