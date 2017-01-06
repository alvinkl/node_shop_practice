require('dotenv').config({ path: '../.env' });

const User = require('../models/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOD);

var users = [
  new User({
    email: 'alvin@gmail.com',
    password: '123123'
  }),
  new User({
    email: 'member1@gmail.com',
    password: '123123'
  }),
  new User({
    email: 'member2@gmail.com',
    password: '123123'
  }),
  new User({
    email: 'member3@gmail.com',
    password: '123123'
  }),
];

let done = 0;

for (let i = 0; i < users.length; i++) {
  users[i].save((err, result) => {
    done++;
    if (done == users.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
