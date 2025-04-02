const AccountAdmin = require("../../models/account-admin.model")

module.exports.login = (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Login",
  })
}
module.exports.register = (req, res) => {
  res.render("admin/pages/register", {
    pageTitle: "Register",
  })
}
module.exports.registerPost = async (req, res) => {
  // req.body : data from fetch() in front end
  const { fullName, email, password } = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email
  }
  );

  if (existAccount) {
    // Send data to front end
    res.json({
      code: "error",
      message: "Email Existed"
    })
    return;
  }
  
  const newAccount = new AccountAdmin({
    fullName: fullName,
    email: email,
    password: password,
    status: "initial"
  });

  await newAccount.save();

  // Send data to front end
  res.json({
    code: "succeeded",
    message: "Success"
  })
}
module.exports.forgotPassword = (req, res) => {
  res.render("admin/pages/forgot-password", {
    pageTitle: "Forgot Password",
  })
}
module.exports.otpPassword = (req, res) => {
  res.render("admin/pages/otp-password", {
    pageTitle: "OTP",
  })
}
module.exports.resetPassword = (req, res) => {
  res.render("admin/pages/reset-password", {
    pageTitle: "Reset Password",
  })
}
module.exports.registerInitial = (req, res) => {
  res.render("admin/pages/register-initial", {
    pageTitle: "Successfully created account",
  })
}