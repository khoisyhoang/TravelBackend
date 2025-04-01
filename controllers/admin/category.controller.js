module.exports.list = (req, res) => {
    res.render("admin/pages/category-list", {
      pageTitle: "Mange category",
    })
}
module.exports.create = (req, res) => {
    res.render("admin/pages/category-create", {
      pageTitle: "Create category",
    })
}