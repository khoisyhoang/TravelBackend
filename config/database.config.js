const mongoose = require('mongoose');


module.exports.connect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE);
        
    } 
    catch (error) {
        handleError(error);
    }
}



