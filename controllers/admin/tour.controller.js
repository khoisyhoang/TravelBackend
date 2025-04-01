module.exports.list = (req, res) => {
    res.render("admin/pages/tour-list", {
      pageTitle: "Tour List",
    })
}
module.exports.create = (req, res) => {
    res.render("admin/pages/tour-create", {
      pageTitle: "Create tour",
    })
}
module.exports.trash = (req, res) => {
    res.render("admin/pages/tour-trash", {
      pageTitle: "Delete tour",
    })
}
