module.exports.list = (req, res) => {
    res.render("admin/pages/setting-list", {
      pageTitle: "Setting List",
    })
}
module.exports.websiteInfo = (req, res) => {
    res.render("admin/pages/setting-website-info", {
      pageTitle: "Setting Webinfo",
    })
}
module.exports.accountAdminList = (req, res) => {
    res.render("admin/pages/setting-account-admin-list", {
      pageTitle: "Admin Accounts",
    })
}
module.exports.accountAdminCreate = (req, res) => {
    res.render("admin/pages/setting-account-admin-create", {
      pageTitle: "Create Admin Account",
    })
}
module.exports.roleList = (req, res) => {
    res.render("admin/pages/setting-role-list", {
      pageTitle: "nhóm quyền",
    })
}
module.exports.roleCreate = (req, res) => {
    res.render("admin/pages/setting-role-create", {
      pageTitle: "tạo nhóm quyền",
    })
}
