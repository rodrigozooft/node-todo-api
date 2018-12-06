const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [
  {text: 'My first todo'}, 
  {text: 'My second todo'}, 
  {text: 'My third todo'}
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

  })

});