const Post = require("../model/post");
const { validationResult, body } = require("express-validator/check");
const User = require("../model/user");


exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId).populate('creator')
    .then((post) => {
      res.status(200).json({
        message: "fetched successfully!",
        post: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMyPosts = async (req, res, next) => {
  const userId = req.params.userId;
  
  User.findById(userId).populate('posts')
  .then (user => {
    
    res.status(200).json({
      message: "fetched successfully!",
      posts: user.posts,               //devuelve post de usuario nada mas.
    });
  })
};

exports.getPosts = async (req, res, next) => {

  Post.find().populate('creator')
    .then((posts) => {
      res.status(200).json({
        message: "fetched successfully!",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;  //extraigo postsId de parametros.
  Post.findById(postId)
  .then(post => {
    if (!post){  //Existe el post?
      const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
    }
    if (post.creator.toString() !== req.body.userId) { //Es el creador?
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    //clearImage(post.image);                                    -->TODO: Borrar imagen
    return Post.findByIdAndRemove(postId); //remueve el post
  })
  .then(result => {
    return User.findById(req.body.userId); //busca usuario
  })
  .then(user => {
    user.posts.pull(postId); //remueve post del creador
    return user.save();
  })
  .then(result => {
    res.status(200).json({ message: 'Deleted post.' });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.createPost = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   // console.log(errors.array());
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }
     //SI LLEGA ACA NO HUBO ERRORES DE VALIDACION
     const title = req.body.title;
     const description = req.body.description;
     let creator;
     
   

     const post = new Post({
       title: title,
       description: description,
       image: req.file.path, //ruta de imagen
       creator: req.body.userId //referencia a usuario.
     });

     post.save()  //guardar en Mongodb
       .then(result => { 
         return User.findById(req.body.userId)
       }).then(user => {
        creator = user;
        user.posts.push(post);    //referencia
        return user.save();
       }).then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result,
          creator: {_id: creator._id, name: creator.name}
        });
        })
        .catch(err => {
         console.log(err);
       });
   };


   exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
   
    const title = req.body.title;
    const description = req.body.description;
  

    Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        if (post.creator.toString() !== req.body.userId) {
          const error = new Error('Not authorized!');
          error.statusCode = 403;
          throw error;
        }
        post.title = title;
        post.description = description;
        return post.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Post updated!', post: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };