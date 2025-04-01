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