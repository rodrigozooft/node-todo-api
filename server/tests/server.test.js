const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const {todos, populateTodos, users, populateUsers}  = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('PATCH /todos/:id', () => {
  it('Should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var newData = {
      text: "This is the new text",
      completed: true
    }
    request(app)
      .patch(`/todos/${hexId}`)
      .send(newData)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
        expect(res.body.todo.text).toBe(newData.text);
      })
      .end(done)
  });

  it('Should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[2]._id.toHexString();
    var newData = {
      text: "This is the new text for the third todo",
      completed: false
    }
    request(app)
      .patch(`/todos/${hexId}`)
      .send(newData)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
        expect(res.body.todo.text).toBe(newData.text);
      })
      .end(done)
  });
});

describe('GET /users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done)
  });

  it('Should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({})
        })
      .end(done)
  });
});

// describe('POST /users', () => {
//   it('Should')
// });