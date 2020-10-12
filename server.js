require('dotenv').config()
const bodyParser = require("body-parser");
const express = require('express');
const morgan     = require('morgan');

app = express(),
port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.json({extend:true}))
const { Pool } = require('pg');
const dbParams = require('./db/db.js');
const db = new Pool(dbParams);
db.connect();

//const questionsRoutes = require("./routes/questions");
const usersRoutes = require('./api/routes/users');
//const analyticsRoutes = require('./routes/analytics');

app.use("/users", usersRoutes(db));
//app.use("/questions", questionsRoutes(db));
//app.use('/analytics', analyticsRoutes(db));

app.listen(port);

console.log('Prepster RESTful API server started on: ' + port);