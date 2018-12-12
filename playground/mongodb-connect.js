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

  // db.collection('Todos').insertOne({
  //   text: 'Something to do', 
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert Todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Federico',
  //   age: 19,
  //   location: 'Chile'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert User')
  //   }

  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));

  // });

  client.close();
});