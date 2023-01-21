const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.name);
  const existingUser = User.findOne({ email: email }).then((userDoc) => {
    if (userDoc) { 
      return res.status(422).json({
        message: "Email exists.",
        errors: errors.array(),
      });
    }
  }); //busca si existe un usuario con ese email

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user
    .save()
    .then((user) => {
      res.status(201).json({
        message: "User created successfully!",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.email, req.body.password);
  let loadedUser;

  User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      //usuario no existe
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    if (password !== user.password) {
      //password no coincide
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    loadedUser = user;
    }).then((result) => {
      if (loadedUser) {
        const token = jwt.sign(
            {
              email: loadedUser.email,
              userId: loadedUser._id, 
            },
            "SuperLongSecretKey",
            { expiresIn: "1h" } );
            
            
            res.status(200).json(
              {
              token: token,      //para setear token en el front
              userId: loadedUser._id.toString() //para setear el id del usuario en el front y poder hacer requests personales.
          });
        
        }})      

};
