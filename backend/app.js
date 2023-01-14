const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json()); // application/json

app.use('/uploads/images', express.static(path.join('uploads', 'images'))); //middleware para acceder a imagenes

app.use((req, res, next) => {  //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});





app.use('/feed', feedRoutes);
app.use('/users', userRoutes);

mongoose
  .connect(
    'mongodb+srv://root:root@cluster0.wyrhnta.mongodb.net/?retryWrites=true&w=majority'
  )
  .then( () => {
    app.listen(5000); // diferente puerto para evitar conflictos
    console.log('Conectado!');
  })
  .catch(err => {
    console.log(err);
  });