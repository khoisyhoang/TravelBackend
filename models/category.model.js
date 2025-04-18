const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema(
    {
        name: String,
        parent: String,
        position: Number,
        status: String,
        description: String,
        createdBy: String,
        updatedBy: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: String,
        deletedAt: Date,
    }, 
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', schema, "categories")

module.exports = Category;