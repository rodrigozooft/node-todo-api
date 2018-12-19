// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

//'mongodb://localhost:27017/TodoApp'
MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to the database server');
  }
  console.log('Connected to MongodDB server');
  const db = client.db('TodoApp');
  
  client.close();
});