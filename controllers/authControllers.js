module.exports.signup_get = (req,res) => {
  res.render('signup');
}

module.exports.signup_post = (req,res) => {
  res.send("signed up");
}

module.exports.login_get = (req,res) => {
  res.render('login');
}

module.exports.login_post = (req,res) => {
  res.send("logged in");
}