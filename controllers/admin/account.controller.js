const AccountAdmin = require("../../models/account-admin.model")
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

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

  // Encrypt
  const salt = await bcrypt.genSalt(10); // create 10 random char
  const hash = await bcrypt.hash(password, salt);

  const newAccount = new AccountAdmin({
    fullName: fullName,
    email: email,
    password: hash,
    status: "initial"
  });

  await newAccount.save();

  // Send data to front end
  res.json({
    code: "succeeded",
    message: "Success"
  })
}


module.exports.loginPost = async (req, res) => {
  // req.body : data from fetch() in front end
  const { email, password } = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email
  }
  );

  if (!existAccount) {
    // Send data to front end
    res.json({
      code: "error",
      message: "Email Not Found"
    })
    return;
  }

  // Compare password with hashed password in database
  const isPasswordValid = await bcrypt.compare(password, existAccount.password);
  if (!isPasswordValid) {
    // Send data to front end
    res.json({
      code: "error",
      message: "Password Not Correct"
    })
    return;
  }
  
  if (existAccount.status !== "initial") {
    // Send data to front end
    res.json({
      code: "error",
      message: "Account Not Activated"
    })
    return;
  }
  // Add JWT token
  const token = jwt.sign({
    id: existAccount.id,
    email: existAccount.email
  }, process.env.JWT_SECRET, {
    expiresIn: "1h" // 1 hour
  });

  // Save to cookie
  res.cookie("token", token, {
    maxAge: 25 * 60 * 60 * 1000, // 1 day,
    httpOnly: true, // only server can access this cookie
    sameSite: "Strict", // only send cookie to same site
  });


  // Check status
  res.json({
    code: "succeeded",
    message: "Success",
    
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
module.exports.logoutPost = (req, res) => {
  res.clearCookie("token"); // clear cookie
  res.json({
    code: "success",
    message: "Success"
  })
}