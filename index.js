// console.log("inside index file");

// for (var i = 0; i < 100; i++) {
//     console.log(i);
// }

// console.log('loop finished again');

// import React from 'react';
// var React = require('react');

// var http = require('http');

// http.createServer(function (req, res) {

//     if (req.url === '/login') {
//         res.end('Login route working fine');
//     }
//     else if (req.url === '/signup') {
//         res.end('signup route working fine');
//     }
//     else {
//         res.end("Hello World");
//     }

// }).listen(4000);

// import express from 'express';

// const app = express();

// app.use((req, res, next) => {
//     // console.log(req.url);
//     next();
// });

// app.get("/signup", (req, res, next) => {
//     console.log('inside signup ');
//     res.end('Signup run');
// });

// app.use((req, res) => {
//     console.log('inside second middleware 1');
//     res.end();
// })

// app.listen(7000, () => {
//     console.log('=================== server started on 7000 ===================');
// });

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/students.js';
import morgan from 'morgan';

const app = express();

mongoose.connect(
  'mongodb+srv://zeeshanshabbir:mongodbzeeshan@cluster0.z3dgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log(
    '=================== ISI Secrete Database Connected ==================='
  );
});
mongoose.connection.on('error', () => {
  console.log(
    '=================== Black Vigo is outside your home ==================='
  );
});

app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/get-allstudent', async (req, res) => {
  console.log(req.url);
  let allData = await Student.find();
  res.json(allData);
});
app.get('/get-student/:studentName', async (req, res) => {
  let { studentName } = req.params;
  console.log(studentName);
  let allData = await Student.find({ studentName });
  res.json(allData);
});
app.get('/get-student/:pagenumber/:studentperpage', async (req, res) => {
  let { pagenumber, studentperpage } = req.params;
  console.log(pagenumber, studentperpage);
  let skipcount = (pagenumber - 1) * studentperpage;
  let allData = await Student.find().limit(Number(pagenumber)).skip(skipcount);
  res.json(allData);
});

// app.use((req, res) => {
//     console.log(req.body, '***************');
//     res.end();
// });
app.post('/addStudents', async (req, res) => {
  let student = new Student({
    studentName: req.body.studentname,
    email: req.body.email,
    rollNumber: req.body.roll,
  });
  let studentdata = await student.save();
  console.log('=================== working ===================');
  res.json(studentdata);
});

app.listen('5000', () => {
  console.log('=================== server started on 5000 ===================');
});
