const User = require("../models/User");

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