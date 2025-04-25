const Category = require("../../models/category.model")

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
module.exports.createPost = async (req, res) => {

    
    if (req.body.position){
      req.body.position = parseInt(req.body.position)
    }
    else {
      // if no position is provided, set it to the last position (record in database + 1)
      const totalRecord = await Category.countDocuments({});
      req.body.position = totalRecord + 1;
    }

    req.body.createBy = req.account.id;
    req.body.updatedBy = req.account.id;
    req.body.avatar = req.file ? req.file.path : "";
    
    const newRecord = new Category(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Done creating categ"
    })
    
}