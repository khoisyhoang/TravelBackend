const AccountAdmin = require("../../models/account-admin.model")
const ForgotPassword = require("../../models/forgot-password.model");
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

const generateHelper = require("../../helpers/generate.helper");
const mailHelper = require("../../helpers/mail.helper");


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
  const { email, password, rememberPassword } = req.body;

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
    expiresIn: rememberPassword ? "30d" : "1d" // expires in 1 hour
  });

  // Save to cookie
  res.cookie("token", token, {
    maxAge: rememberPassword? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // remove the cookie after 1 day
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
module.exports.forgotPasswordPost = async (req, res) => {
  const {email} = req.body;
  const existAccount = await AccountAdmin.findOne({
    email: email
  })
  
  
  if (!existAccount) {
 
    res.json({
      code: "error",
      message: "Email Not Found"
    })
    return;
  }
  // Check whether that email has OTP code in the database
  const existEmailInForgotPassword = await ForgotPassword.findOne({
    email: email
  });
  if (existEmailInForgotPassword) {
    res.json({
      code: "error",
      message: "Your OTP code still valid!"
    })
    return;
  }

  // Create OPT code
  const otp = generateHelper.generateOtp(4); // 4 digits

  // Save OTP code to database, delete after 5 minutes
  const newRecord = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
  });
  await newRecord.save();

  // send email to user with OTP code
  const subject = "Travel App - Verify your OTP"
  const content = `Your OTP is <b>${otp}</b>. This will be valid in 5 minutes, don't give this code to anyone:)`
  mailHelper.sendMail(email, subject, content);

  res.json({
    code: "success",
    message: "success"
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