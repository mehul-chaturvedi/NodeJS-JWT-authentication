var express = require('express');
var authController = require('./authController');
const cors = require('cors')
var db = require('./db');
var port = process.env.PORT || 5000;
var app = express();
app.use(cors())


app.listen(port, ()=>{
    console.log('server started at ', port);
})


app.get('/', ()=>{
    console.log('api works')
})
app.use('/auth', authController);



module.exports = app;