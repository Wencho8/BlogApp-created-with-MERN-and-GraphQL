const User = require('../model/user');
const Post = require('../model/post');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async function({ userInput }, req) {
    
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: userInput.password
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },          //PONER COMA!!!

  login: async function({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('User not found.');
      error.code = 401;
      throw error;
    }
    if (user.password !== password) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign( {
      userId: user._id.toString(),
      email: user.email
    }, 'secretkeylong', { expiresIn: '1h' });

    return { token: token, userId: user._id.toString() };
  },

  createPost: async function({ postInput }, req) {
   
     /*if (!req.isAuth) {       //middleware para autenticacion
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }*/

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid user.');
      error.code = 401;
      throw error;
    }
    const post = new Post({
      title: postInput.title,
      description: postInput.description,
      image: postInput.image,
      creator: user
    });

    const createdPost = await post.save();
    
    user.posts.push(createdPost);

    await user.save();

    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString()
    };

  },

  posts: async function({ page }, req) {
    /*if (!req.isAuth) {  //middleware para autenticacion
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }*/
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('creator');
   
   
    return {
      posts: posts.map(p => {
        return {
          ...p._doc,
          _id: p._id.toString(), //ovveride id to string
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        };
      }),
      totalPosts: totalPosts
    };
  }

};