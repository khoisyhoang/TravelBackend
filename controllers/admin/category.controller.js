const moment = require('moment'); 
const Category = require("../../models/category.model")
const AccountAdmin = require("../../models/account-admin.model")
const categoryHelper = require("../../helpers/category.helper")

module.exports.list = async (req, res) => {
    const categoryList = await Category.find({
      deleted: false
    }).sort({
      position: "asc"
    })

    for (const item of categoryList) {
      if (item.createdBy){
        const inforAccountCreated = await AccountAdmin.findOne( { _id: item.createdBy } )
        item.createdByFullName = inforAccountCreated.fullName;
        
      }
      

      if (item.updatedBy){
        const inforAccountUpdated = await AccountAdmin.findOne( { _id: item.updatedBy } );
        item.updatedByFullName = inforAccountUpdated.fullName;
        
      }
      
      item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
      item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
    }
    
    
    res.render("admin/pages/category-list", {
      pageTitle: "Mange category",
      categoryList: categoryList
    })
}
module.exports.create = async (req, res) => {
    const categoryList = await Category.find({
      deleted: false
    })
    const categoryTree = categoryHelper.buildCategoryTree(categoryList);
    
    
    res.render("admin/pages/category-create", {
      pageTitle: "Create category",
      categoryList: categoryTree
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

    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;
    req.body.avatar = req.file ? req.file.path : "";
    
    const newRecord = new Category(req.body);
    await newRecord.save();

    // return message to pug files object message = {"success" : "Category created successfully"}
    req.flash("success", "Category created successfully");
    

    res.json({
      code: "success",
      message: "Done creating categ"
    })
    
}