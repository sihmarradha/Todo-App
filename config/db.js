'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_dev', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error',(err)=> {
    console.log('Error while connected to database..!!',err);
});

db.once('open',()=> {
    console.log('***Database connected successfully..!!!');
});

module.exports = db;
