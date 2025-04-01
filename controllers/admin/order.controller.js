module.exports.list = (req, res) => {
    res.render("admin/pages/order-list", {
      pageTitle: "Order List",
    })
}
module.exports.edit = (req, res) => {
    res.render("admin/pages/order-edit", {
      pageTitle: "Order Edit",
    })
}
