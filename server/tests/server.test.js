const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {_id: new ObjectID(), text: 'My first todo', completed: true}, 
  {_id: new ObjectID(), text: 'My second todo'}, 
  {_id: new ObjectID(), text: 'My third todo', completed: true}
]

beforeEach((done) => {
  Todo.deleteMany({}).then(()=> {
      return Todo.insertMany(todos);
  }).then(()=> done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(4);
          expect(todos[3].text).toBe(text);
          done();
        }).catch((e) =>{
          done(e);
        });
      });
  });

  it('should not create a todo with invalid data', (done) =>{

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => {
          done(e);
        })
      })
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc by ID', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('Should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('Should return 404 for non objects ids', (done) => {
    request(app)
      .get('/todos/6c0c46605cb4e403d3c972d5282')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos:id', () => {
  it('Should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err){
          return done(err)
        }
        Todo.findById(hexId).then((todo) => {
          expect(todos).toEqual(
            expect.not.arrayContaining([
              todo
            ])
          );
          done();
        }).catch((err) => done(err));
      });
  });

  it('Should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if object is not valid', (done) => {
    request(app)
      .delete('/todos/6c0c46605cb4e403d3c972d5282')
      .expect(404)
      .end(done);    
  });
});