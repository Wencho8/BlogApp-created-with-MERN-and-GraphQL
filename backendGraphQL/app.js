const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const app = express();

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

app.use(bodyParser.json()); // application/json

app.use('/uploads/images', express.static(path.join('uploads', 'images'))); //middleware para acceder a imagenes

app.use((req, res, next) => {  //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,

})); //middleware para graphql

app.put('/post-image', (req, res, next) => {
    if (!req.file) {     //de multer que esta instalado. verifica Si no hay archivo
        return res.status(200).json({ message: 'No file provided!' });
    }
    /*if (req.body.oldPath) { //si hay una imagen anterior, la borra
        clearImage(req.body.oldPath);
    }*/
    return res.status(201).json({ message: 'File stored.', filePath: req.file.path });
} );
    

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


