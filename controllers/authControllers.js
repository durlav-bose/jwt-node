const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = {
    email: "",
    password: ""
  }

  if(err.code === 11000) {
    error.email = "This email is already registered"
    return error;
  }

  if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties },index) => {
      error[properties.path] = properties.message
    })
  }
  return error;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my secret", {
    expiresIn: maxAge
  })
}

module.exports.signup_get = (req,res) => {
  res.render('signup');
}

module.exports.signup_post = async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email: email,
      password: password
    })
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })
    res.status(201).json({user: user._id} );
  } catch (error) {
    const errors = handleErrors(error);
    console.log('errors :>> ', errors);
    res.status(400).json({ errors: errors });
  }
}

module.exports.login_get = (req,res) => {
  res.render('login');
}

module.exports.login_post = (req,res) => {
  const { email, password } = req.body;
  res.send("logged in ");
}