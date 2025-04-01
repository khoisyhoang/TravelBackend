module.exports.edit = (req, res) => {
    res.render("admin/pages/profile-edit", {
      pageTitle: "Profile Edit",
    })
}
module.exports.changePassword = (req, res) => {
    res.render("admin/pages/profile-change-password", {
      pageTitle: "Profile Change Password",
    })
}