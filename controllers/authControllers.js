const User = require("../models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code);
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
    res.status(201).json(user);
  } catch (error) {
    handleErrors(error);
    res.status(400).send("error, user not created...");
  }
}

module.exports.login_get = (req,res) => {
  res.render('login');
}

module.exports.login_post = (req,res) => {
  const { email, password } = req.body;
  res.send("logged in ");
}