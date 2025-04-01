module.exports.list = (req, res) => {
    res.render("admin/pages/user-list", {
      pageTitle: "User List",
    })
}