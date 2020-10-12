require('dotenv').config()
const bodyParser = require("body-parser");
const express = require('express'),
const morgan     = require('morgan');

  app = express(),
  port = process.env.PORT || 3000;
  app.use(morgan('dev'));
  app.use(bp.json({extend:true}))
  const { Pool } = require('pg');

  








  

app.listen(port);

console.log('Prepster RESTful API server started on: ' + port);